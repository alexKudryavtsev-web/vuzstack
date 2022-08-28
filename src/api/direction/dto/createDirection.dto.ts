import { IsEnum, IsNumber, IsString } from 'class-validator';
import { ExamEnum } from '@app/api/mark/mark.entity';

export class CreateDirectionDto {
  @IsString()
  name: string;

  @IsNumber()
  vuzId: number;

  @IsNumber()
  budgetPlaces: number;

  @IsString()
  article: string;

  @IsEnum(ExamEnum, { each: true })
  requiredExams: ExamEnum[];

  @IsEnum(ExamEnum, { each: true })
  optionalExams: ExamEnum[];
}
