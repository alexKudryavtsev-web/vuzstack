import {
  CloudinaryService,
  ImageType,
} from '@app/cloudinary/cloudinary.service';
import { UserEntity, UserStatusEnum } from '@app/api/user/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileType } from './types/profile.type';
import { DirectionService } from '../direction/direction.service';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly avatarService: CloudinaryService,
    private readonly directionService: DirectionService,
  ) {}

  async readProfile(userId: number): Promise<ProfileType> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['directions', 'marks'],
    });

    const avatarUrl = await this.avatarService.getURL(userId);

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
      avatar: avatarUrl,
    };
  }

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

    user.isVerified = true;
    user.status = UserStatusEnum.MARKS_UPLOAD;

    await this.userRepository.save(user);

    return await this.buildProfile(currentUserId);
  }

  async uploadMarks(userId: number): Promise<ProfileType> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    user.status = UserStatusEnum.DIRECTIONS_UPLOAD;

    await this.userRepository.save(user);

    return await this.buildProfile(userId);
  }

  async uploadDirections(userId: number): Promise<ProfileType> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    user.status = UserStatusEnum.AWAITING_RESULT;

    await this.userRepository.save(user);

    return await this.buildProfile(userId);
  }

  async acceptWithCookie(currentUserId: number): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: currentUserId },
    });

    user.acceptedWithCookie = true;

    await this.userRepository.save(user);
  }

  async buildProfile(userId: number): Promise<ProfileType> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['marks', 'directions', 'directions.vuz'],
    });
    const avatarUrl = await this.avatarService.getURL(user.id);

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
      avatar: avatarUrl,
    };
  }
}
