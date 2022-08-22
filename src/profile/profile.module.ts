import { ImageService } from '@app/cloudinary/image.service';
import { UserEntity } from '@app/user/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarkEntity } from './mark.entity';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [TypeOrmModule.forFeature([MarkEntity, UserEntity])],
  controllers: [ProfileController],
  providers: [ImageService, ProfileService],
})
export class ProfileModule {}
