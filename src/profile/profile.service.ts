import { ImageService, ImageType } from '@app/image/image.service';
import { UpdateUserDto } from '@app/user/dto/updateUserDto';
import { UserEntity } from '@app/user/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import { join } from 'path';
import { Repository } from 'typeorm';
import { CreateMarkDto } from './dto/createMark.dto';
import { MarkEntity } from './mark.entity';
import { ProfileType } from './types/profile.type';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly avatarService: ImageService,
    @InjectRepository(MarkEntity)
    private readonly markRepository: Repository<MarkEntity>,
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

    Object.assign(user, updateUserDto);

    const res = await this.userRepository.save(user);

    return await this.buildProfileFromUserEntity(res);
  }

  async uploadMarks(
    createMark: CreateMarkDto,
    currentUserId: number,
  ): Promise<ProfileType> {
    const user = await this.userRepository.findOne(currentUserId);

    const mark = new MarkEntity();

    Object.assign(mark, createMark);
    user.mark = mark;

    await this.markRepository.save(mark);
    await this.userRepository.save(user);

    return await this.buildProfileFromUserEntity(user);
  }

  async acceptWithCookie(currentUserId: number): Promise<void> {
    const user = await this.userRepository.findOne(currentUserId);

    user.acceptedWithCookie = true;

    await this.userRepository.save(user);
  }

  async readExams(): Promise<string[]> {
    const exams = await fs.promises.readFile(
      join(__dirname, '..', '..', 'etc', 'exams.json'),
      'utf-8',
    );

    return JSON.parse(exams);
  }

  async readAchievements(): Promise<string[]> {
    const exams = await fs.promises.readFile(
      join(__dirname, '..', '..', 'etc', 'achievements.json'),
      'utf-8',
    );

    return JSON.parse(exams);
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
