import { IsInt, IsNumber, Max, Min } from 'class-validator';

export class UpdateExamDto {
  @IsNumber()
  id: number;

  @IsInt()
  @Min(1)
  @Max(100)
  result: number;
}
