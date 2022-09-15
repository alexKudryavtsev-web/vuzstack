import { InjectQueue } from '@nestjs/bull';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bull';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UserResponseInterface } from './types/userResponse.interface';
import { UserEntity } from './user.entity';
import { v4 as uuid } from 'uuid';
import { hash } from 'bcryptjs';
import { UpdateUserDto } from './dto/updateUserDto';
import { SessionEntity } from '@app/api/session/session.entity';
import { sign, verify } from 'jsonwebtoken';
import { UpdatePasswordDto } from './dto/updatePassword.dto';

const HASH_ROUNDS = 10;

@Injectable()
export class UserService {
  constructor(
    @InjectQueue('email') private readonly emailQueue: Queue,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(SessionEntity)
    private readonly sessionRepository: Repository<SessionEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const candidate = await this.userRepository.findOne({
      email: createUserDto.email,
    });

    if (candidate) {
      throw new HttpException('Почта занята', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const user = new UserEntity();

    Object.assign(user, createUserDto);

    user.password = await hash(createUserDto.password, HASH_ROUNDS);
    user.activationLink = uuid();

    // TODO: crutch
    user.priority = [];

    await this.emailQueue.add('activation-email', {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      link: `${process.env.CLIENT_URL}/activate-user/${user.activationLink}`,
    });

    return await this.userRepository.save(user);
  }

  async updateUser(
    updateUserDto: UpdateUserDto,
    currentUserId: number,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOne(currentUserId);

    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }

    Object.assign(user, updateUserDto);

    return await this.userRepository.save(user);
  }

  async deleteUser(currentUserId: number): Promise<void> {
    const user = await this.userRepository.findOne(currentUserId);
    await this.sessionRepository.delete({ user });

    await this.userRepository.remove(user);
  }

  async activateUser(activationLink: string): Promise<void> {
    const user = await this.userRepository.findOne({ activationLink });

    if (!user || user.activationLink !== activationLink) {
      throw new HttpException('Wrong link', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    user.isActivated = true;

    await this.userRepository.save(user);
  }

  async resetPassword(currentUserId: number): Promise<void> {
    const user = await this.userRepository.findOne(currentUserId);

    await this.sessionRepository.delete({ user });

    const token = this.generateResetPasswordToken(user);

    await this.emailQueue.add('reset-password-email', {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      link: `${process.env.CLIENT_URL}/update-password/${token}`,
    });
  }

  async updatePassword(
    updatePasswordDto: UpdatePasswordDto,
    token: string,
  ): Promise<UserEntity> {
    const dataFromToken: any = this.verifyResetPasswordToken(token);

    if (!dataFromToken) {
      throw new HttpException(
        'The token is invalid (Its lifetime is 1 hour)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userRepository.findOne(
      {
        email: dataFromToken.email,
      },
      {
        select: [
          'id',
          'email',
          'firstName',
          'lastName',
          'password',
          'isVerified',
          'isActivated',
          'createdAt',
          'updatedAt',
          'activationLink',
          'agree',
          'acceptedWithCookie',
          'status',
        ],
      },
    );

    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }

    if (dataFromToken.id !== user.id) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    user.password = await hash(updatePasswordDto.password, HASH_ROUNDS);

    return await this.userRepository.save(user);
  }

  async readById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne(id);
  }

  buildUserResponse(user: UserEntity): UserResponseInterface {
    return {
      user,
    };
  }

  generateResetPasswordToken(user: UserEntity) {
    const payload = {
      id: user.id,
      email: user.email,
    };

    return sign(payload, process.env.RESET_PASSWORD_SECRET, {
      expiresIn: process.env.RESET_PASSWORD_TIME,
    });
  }

  verifyResetPasswordToken(token: string) {
    try {
      return verify(token, process.env.RESET_PASSWORD_SECRET);
    } catch (error) {
      return null;
    }
  }
}
