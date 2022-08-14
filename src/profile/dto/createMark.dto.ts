import { IsArray } from 'class-validator';

export class CreateMarkDto {
  @IsArray()
  exams: { subject: string; result: number }[];

  @IsArray()
  achievements: string[];
}
