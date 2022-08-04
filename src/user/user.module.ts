import { Module } from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import { UserController } from '@app/user/user.controller';
import { BullModule } from '@nestjs/bull';
import { EmailProcessor } from './email.processor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { AuthGuard } from './guards/auth.guard';
import { SessionEntity } from '@app/session/session.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, SessionEntity]),
    BullModule.registerQueue({ name: 'email' }),
  ],
  providers: [UserService, EmailProcessor, AuthGuard],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
