import { User } from '@app/user/decorators/user.decorator';
import { AuthGuard } from '@app/user/guards/auth.guard';
import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AvatarService } from './avatar.service';

@Controller('avatar')
export class AvatarController {
  constructor(private readonly avatarService: AvatarService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))

  async upload(
    @User('id') currentUserId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    await this.avatarService.uploadFile(currentUserId, file);
  }

  @Get(':id')
  async getFile(@Param('id') userId: number) {
    const url = await this.avatarService.getFile(userId);

    return {
      avatar: url,
    };
  }
}
