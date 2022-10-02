import { User } from '@app/api/user/decorators/user.decorator';
import { AuthGuard } from '@app/api/user/guards/auth.guard';
import {
  Body,
  Controller,
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
import { UploadUserInfoDto } from './dto/uploadUserInfo.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileServce: ProfileService) {}

  @Post('accept-with-cookie')
  @UseGuards(AuthGuard)
  async acceptWithCookie(
    @User('id') currentUserId: number,
  ): Promise<ProfileType> {
    return await this.profileServce.acceptWithCookie(currentUserId);
  }

  @Post('user-info')
  @UseGuards(AuthGuard)
  async uploadUserInfo(
    @User('id') currentUserId: number,
    @Body() uploadUserInfoDto: UploadUserInfoDto,
  ): Promise<ProfileType> {
    return await this.profileServce.uploadUserInfo(
      currentUserId,
      uploadUserInfoDto,
    );
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

  @Post('ready')
  @UseGuards(AuthGuard)
  async setReady(@User('id') currentUserId: number): Promise<ProfileType> {
    return await this.profileServce.setReady(currentUserId);
  }
}
