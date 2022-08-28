import { IsInt, IsNumber, Max, Min } from 'class-validator';

export class UpdateMarkDto {
  @IsNumber()
  id: number;

  @IsInt()
  @Min(1)
  @Max(100)
  result: number;
}
