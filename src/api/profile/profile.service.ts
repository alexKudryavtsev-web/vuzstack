import {
  CloudinaryService,
  ImageType,
} from '@app/cloudinary/cloudinary.service';
import { UpdateUserDto } from '@app/api/user/dto/updateUserDto';
import { UserEntity } from '@app/api/user/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileType } from './types/profile.type';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly avatarService: CloudinaryService,
  ) {}

  async readProfile(userId: number): Promise<ProfileType> {
    const user = await this.userRepository.findOne(userId, {
      relations: ['directions', 'exams'],
    });

    const avatarUrl = await this.avatarService.getURL(userId);

    delete user.activationLink;
    delete user.agree;
    delete user.isActivated;
    delete user.updatedAt;

    return {
      ...user,
      avatar: avatarUrl,
    };
  }

  async uploadPassport(currentUserId: number, passport: Express.Multer.File) {
    const user = await this.userRepository.findOne(currentUserId);
    await this.avatarService.uploadFile(
      currentUserId,
      passport,
      ImageType.PASSPORT,
    );

    user.isVerified = true;

    await this.userRepository.save(user);
  }

  async updateUser(currentUserId: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne(currentUserId);

    Object.assign(user, updateUserDto);

    const res = await this.userRepository.save(user);

    return await this.buildProfileFromUserEntity(res);
  }

  async acceptWithCookie(currentUserId: number): Promise<void> {
    const user = await this.userRepository.findOne(currentUserId);

    user.acceptedWithCookie = true;

    await this.userRepository.save(user);
  }

  async buildProfileFromUserEntity(user: UserEntity): Promise<ProfileType> {
    const avatarUrl = await this.avatarService.getURL(user.id);

    delete user.activationLink;
    delete user.agree;
    delete user.isActivated;
    delete user.updatedAt;

    return {
      ...user,
      avatar: avatarUrl,
    };
  }
}
