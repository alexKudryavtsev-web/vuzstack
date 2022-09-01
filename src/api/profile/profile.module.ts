import { CloudinaryService } from '@app/cloudinary/cloudinary.service';
import { UserEntity } from '@app/api/user/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { DirectionService } from '../direction/direction.service';
import { DirectionEntity } from '../direction/direction.entity';
import { VuzEntity } from '../direction/vuz.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, DirectionEntity, VuzEntity])],
  controllers: [ProfileController],
  providers: [CloudinaryService, ProfileService, DirectionService],
})
export class ProfileModule {}
