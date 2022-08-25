import { IsEnum, IsInt, Max, Min } from 'class-validator';
import { ExamEnum } from '../exam.entity';

export class CreateExamDto {
  @IsEnum(ExamEnum)
  exam: ExamEnum;

  @IsInt()
  @Min(1)
  @Max(100)
  result: number;
}
