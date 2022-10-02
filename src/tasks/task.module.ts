import { DirectionEntity } from '@app/api/direction/direction.entity';
import { UserEntity } from '@app/api/user/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './task.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, DirectionEntity])],
  providers: [TaskService],
})
export class TaskModule {}
