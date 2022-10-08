import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from '@app/api/user/user.service';
import { UserController } from '@app/api/user/user.controller';
import { UserEntity } from '@app/api/user/user.entity';
import { AuthGuard } from '@app/api/user/guards/auth.guard';
import { SessionEntity } from '@app/api/session/session.entity';
import { ProfileEntity } from '@app/api/profile/profile.entity';
import { EmailModule } from '@app/email/email.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, SessionEntity, ProfileEntity]),
    EmailModule,
  ],
  providers: [UserService, AuthGuard],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
