import { Module } from '@nestjs/common';
import { ExamController } from '@app/api/exam/exam.controller';
import { ExamService } from './exam.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamEntity } from './exam.entity';
import { UserEntity } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExamEntity, UserEntity])],
  controllers: [ExamController],
  providers: [ExamService],
})
export class ExamModule {}
