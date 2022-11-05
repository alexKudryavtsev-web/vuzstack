import { EmailModule } from '@app/email/email.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirectionEntity } from '../api/direction/direction.entity';
import { UserEntity } from '../api/user/user.entity';
import { LogicService } from './logic.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, DirectionEntity]),
    EmailModule,
  ],
  providers: [LogicService],
  exports: [LogicService],
})
export class LogicModule {}
