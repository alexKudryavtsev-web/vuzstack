import { Module } from '@nestjs/common';
import { MarkController } from '@app/api/mark/mark.controller';
import { MarkService } from './mark.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarkEntity } from './mark.entity';
import { UserEntity } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MarkEntity, UserEntity])],
  controllers: [MarkController],
  providers: [MarkService],
})
export class MarkModule {}
