import { CloudinaryService } from '@app/cloudinary/cloudinary.service';
import { ProfileService } from '@app/api/profile/profile.service';
import { UserEntity } from '@app/api/user/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionController } from './session.controller';
import { SessionEntity } from './session.entity';
import { SessionService } from './session.service';

@Module({
  imports: [TypeOrmModule.forFeature([SessionEntity, UserEntity])],
  controllers: [SessionController],
  providers: [SessionService, ProfileService, CloudinaryService],
})
export class SessionModule {}
