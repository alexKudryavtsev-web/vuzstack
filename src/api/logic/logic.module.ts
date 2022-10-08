import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirectionEntity } from '../direction/direction.entity';
import { UserEntity } from '../user/user.entity';
import { LogicController } from './logic.controller';
import { LogicService } from './logic.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, DirectionEntity])],
  controllers: [LogicController],
  providers: [LogicService],
  exports: [LogicService],
})
export class LogicModule {}
