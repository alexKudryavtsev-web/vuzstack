import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UserResponseInterface } from './types/userResponse.interface';
import { UserEntity } from './user.entity';
import { v4 as uuid } from 'uuid';
import { hash } from 'bcryptjs';
import { SessionEntity } from '@app/api/session/session.entity';
import { sign, verify } from 'jsonwebtoken';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { ProfileEntity } from '../profile/profile.entity';
import { EmailService } from '@app/email/email.service';
import { OctopusService } from '@app/email/octopus.service';

const HASH_ROUNDS = 10;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(SessionEntity)
    private readonly sessionRepository: Repository<SessionEntity>,
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
    private readonly emailService: EmailService,
    private readonly octopusService: OctopusService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const profile = new ProfileEntity();
    await this.profileRepository.save(profile);

    const candidate = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
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
    user.profile = profile;

    this.emailService.sendActivationMail(user.email, user.activationLink);

    await this.octopusService.addContact(createUserDto.email);

    return await this.userRepository.save(user);
  }

  async activateUser(activationLink: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { activationLink },
    });

    if (!user || user.activationLink !== activationLink) {
      throw new HttpException('Wrong link', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    user.isActivated = true;

    await this.userRepository.save(user);
  }

  async resetPassword(currentUserId: number): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: currentUserId },
    });

    await this.sessionRepository.delete({ user: { id: user.id } });

    const token = this.generateResetPasswordToken(user);

    this.emailService.sendResetPasswordMail(user.email, token);
  }

  async updatePassword(
    updatePasswordDto: UpdatePasswordDto,
    token: string,
  ): Promise<UserEntity> {
    const dataFromToken: any = this.verifyResetPasswordToken(token);

    if (!dataFromToken) {
      throw new HttpException(
        'Поздно (на восстановление пароля дается 2 часа)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userRepository.findOne({
      where: { email: dataFromToken.email },
      select: {
        id: true,
        email: true,
        password: true,
        isActivated: true,
        createdAt: true,
        updatedAt: true,
        activationLink: true,
        agree: true,
      },
    });

    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }

    if (dataFromToken.id !== user.id) {
      throw new HttpException('Запрещенно', HttpStatus.FORBIDDEN);
    }

    user.password = await hash(updatePasswordDto.password, HASH_ROUNDS);

    return await this.userRepository.save(user);
  }

  async readById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { id } });
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
