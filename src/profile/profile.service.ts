import { ImageService, ImageType } from '@app/image/image.service';
import { UpdateUserDto } from '@app/user/dto/updateUserDto';
import { UserEntity } from '@app/user/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import { join } from 'path';
import { Repository } from 'typeorm';
import { ProfileType } from './types/profile.type';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly avatarService: ImageService,
  ) {}

  async readProfile(userId: number): Promise<ProfileType> {
    const user = await this.userRepository.findOne(userId);
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

    console.log(updateUserDto);
    Object.assign(user, updateUserDto);

    const res = await this.userRepository.save(user);

    return await this.buildProfileFromUserEntity(res);
  }

  async readExams(): Promise<string[]> {
    const exams = await fs.promises.readFile(
      join(__dirname, '..', '..', 'static', 'exams.json'),
      'utf-8',
    );

    return JSON.parse(exams);
  }

  async readAchievements(): Promise<string[]> {
    const exams = await fs.promises.readFile(
      join(__dirname, '..', '..', 'static', 'achievements.json'),
      'utf-8',
    );

    return JSON.parse(exams);
  }

  async buildProfileFromUserEntity(user: UserEntity): Promise<ProfileType> {
    const avatarUrl = await this.avatarService.getURL(user.id);

    console.log(avatarUrl);
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
