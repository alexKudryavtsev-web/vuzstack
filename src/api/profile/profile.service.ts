import {
  CloudinaryService,
  ImageType,
} from '@app/cloudinary/cloudinary.service';
import { UserEntity } from '@app/api/user/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileType } from './types/profile.type';
import { DirectionService } from '../direction/direction.service';
import { ProfileEntity } from './profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
    private readonly avatarService: CloudinaryService,
    private readonly directionService: DirectionService,
  ) {}

  async uploadPassport(
    currentUserId: number,
    passport: Express.Multer.File,
  ): Promise<ProfileType> {
    const user = await this.userRepository.findOne({
      where: { id: currentUserId },
    });
    await this.avatarService.uploadFile(
      currentUserId,
      passport,
      ImageType.PASSPORT,
    );

    await this.userRepository.save(user);

    return await this.buildProfile(currentUserId);
  }

  async uploadMarks(userId: number): Promise<ProfileType> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    await this.userRepository.save(user);

    return await this.buildProfile(userId);
  }

  async uploadDirections(userId: number): Promise<ProfileType> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    await this.userRepository.save(user);

    return await this.buildProfile(userId);
  }

  async acceptWithCookie(currentUserId: number): Promise<ProfileType> {
    const user = await this.userRepository.findOne({
      where: { id: currentUserId },
      relations: ['profile'],
    });

    user.profile.acceptedWithCookie = true;

    await this.profileRepository.save(user.profile);

    return this.buildProfile(currentUserId);
  }

  async buildProfile(userId: number): Promise<ProfileType> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['marks', 'directions', 'directions.vuz', 'profile'],
    });

    delete user.activationLink;
    delete user.agree;
    delete user.isActivated;
    delete user.updatedAt;

    return {
      ...user,
      directions: await this.directionService.prepareDirections(
        user.directions,
        user.priority,
      ),
      ...user.profile,
      profile: undefined,
    };
  }
}
