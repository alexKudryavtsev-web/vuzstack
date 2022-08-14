import { ImageService } from '@app/image/image.service';
import { User } from '@app/user/decorators/user.decorator';
import { UpdateUserDto } from '@app/user/dto/updateUserDto';
import { AuthGuard } from '@app/user/guards/auth.guard';
import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateMarkDto } from './dto/createMark.dto';
import { ProfileService } from './profile.service';
import { ProfileType } from './types/profile.type';

@Controller('profile')
export class ProfileController {
  constructor(
    private readonly avatarService: ImageService,
    private readonly profileServce: ProfileService,
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  async readCurrentProfile(@User('id') userId: number): Promise<ProfileType> {
    return this.profileServce.readProfile(userId);
  }

  @Patch()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async updateUser(
    @User('id') currentUserId: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ProfileType> {
    return await this.profileServce.updateUser(currentUserId, updateUserDto);
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
  ) {
    await this.profileServce.uploadPassport(currentUserId, passport);
  }

  @Put('mark')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async uploadMarks(
    @Body() createMarksDto: CreateMarkDto,
    @User('id') currentUserId: number,
  ): Promise<ProfileType> {
    return this.profileServce.uploadMarks(createMarksDto, currentUserId);
  }

  @Get('exams')
  async readExams(): Promise<string[]> {
    return await this.profileServce.readExams();
  }

  @Get('achievements')
  async readAchievements(): Promise<string[]> {
    return await this.profileServce.readAchievements();
  }

  // @Put('direction')
  // @UseGuards(AuthGuard)
  // async uploadDirection() {}
}
