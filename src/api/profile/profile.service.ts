import {
  CloudinaryService,
  ImageType,
} from '@app/cloudinary/cloudinary.service';
import { UserEntity } from '@app/api/user/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileType } from './types/profile.type';
import { DirectionService } from '../direction/direction.service';
import { ProfileEntity } from './profile.entity';
import { UploadUserInfoDto } from './dto/uploadUserInfo.dto';

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
      relations: ['profile'],
    });
    await this.avatarService.uploadFile(
      currentUserId,
      passport,
      ImageType.PASSPORT,
    );

    const url = await this.avatarService.getURL(
      currentUserId,
      ImageType.PASSPORT,
    );

    user.profile.passport = url;

    await this.userRepository.save(user);
    await this.profileRepository.save(user.profile);

    return await this.buildProfile(currentUserId);
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

  async uploadUserInfo(
    userId: number,
    uploadUserInfoDto: UploadUserInfoDto,
  ): Promise<ProfileType> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['profile'],
    });

    Object.assign(user.profile, uploadUserInfoDto, { userInfoUploaded: true });

    await this.profileRepository.save(user.profile);

    return await this.buildProfile(userId);
  }

  async buildProfile(userId: number): Promise<ProfileType> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: [
        'marks',
        'directions',
        'directions.article',
        'directions.vuz',
        'directions.vuz.article',
        'profile',
        'result',
        'result.vuz',
      ],
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

  async setReady(userId: number): Promise<ProfileType> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['directions', 'marks', 'profile'],
    });

    if (!user.profile.userInfoUploaded) {
      throw new HttpException(
        'Информация "Обо мне" не указана',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!user.profile.passport) {
      throw new HttpException('Паспорт не загружен', HttpStatus.BAD_REQUEST);
    }

    if (user.marks.length < 3) {
      throw new HttpException(
        'ЕГЭ не указано до конца',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (user.directions.length < 2) {
      throw new HttpException(
        '"Мечта" и "Запас" для поступления не выбраны',
        HttpStatus.BAD_REQUEST,
      );
    }

    user.profile.ready = true;

    await this.profileRepository.save(user.profile);

    return await this.buildProfile(userId);
  }
}
