import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from '@app/api/user/user.service';
import { UserController } from '@app/api/user/user.controller';
import { EmailProcessor } from '@app/api/user/email.processor';
import { UserEntity } from '@app/api/user/user.entity';
import { AuthGuard } from '@app/api/user/guards/auth.guard';
import { SessionEntity } from '@app/api/session/session.entity';
import { ProfileEntity } from '@app/api/profile/profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, SessionEntity, ProfileEntity]),
    BullModule.registerQueue({ name: 'email' }),
  ],
  providers: [UserService, EmailProcessor, AuthGuard],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
