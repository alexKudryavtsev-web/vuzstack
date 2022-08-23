import { IsEnum, IsNumber, IsString } from 'class-validator';
import { ExamEnum } from '../direction.entity';

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
