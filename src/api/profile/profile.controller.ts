import { CloudinaryService } from '@app/cloudinary/cloudinary.service';
import { User } from '@app/api/user/decorators/user.decorator';
import { AuthGuard } from '@app/api/user/guards/auth.guard';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProfileService } from './profile.service';
import { ProfileType } from './types/profile.type';

@Controller('profile')
export class ProfileController {
  constructor(
    private readonly avatarService: CloudinaryService,
    private readonly profileServce: ProfileService,
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  async readCurrentProfile(@User('id') userId: number): Promise<ProfileType> {
    return this.profileServce.readProfile(userId);
  }

  @Post('accept-with-cookie')
  @UseGuards(AuthGuard)
  async acceptWithCookie(@User('id') currentUserId: number): Promise<void> {
    await this.profileServce.acceptWithCookie(currentUserId);
  }

  @Patch('avatar')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadAvatar(
    @User('id') currentUserId: number,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    await this.avatarService.uploadFile(currentUserId, avatar);
  }

  @Patch('passport')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('passport'))
  async uploadPassport(
    @User('id') currentUserId: number,
    @UploadedFile() passport: Express.Multer.File,
  ): Promise<ProfileType> {
    if (!passport) {
      throw new HttpException('Паспорт не загружен', HttpStatus.BAD_REQUEST);
    }
    return await this.profileServce.uploadPassport(currentUserId, passport);
  }

  @Post('marks')
  @UseGuards(AuthGuard)
  async uploadMarks(@User('id') currentUserId: number): Promise<ProfileType> {
    return await this.profileServce.uploadMarks(currentUserId);
  }

  @Post('directions')
  @UseGuards(AuthGuard)
  async uploadDirections(
    @User('id') currentUserId: number,
  ): Promise<ProfileType> {
    return await this.profileServce.uploadDirections(currentUserId);
  }
}
