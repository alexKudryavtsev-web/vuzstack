import { IsEnum, IsInt, Max, Min } from 'class-validator';
import { ExamEnum } from '../mark.entity';

export class CreateMarkDto {
  @IsEnum(ExamEnum)
  exam: ExamEnum;

  @IsInt()
  @Min(1)
  @Max(100)
  result: number;
}
