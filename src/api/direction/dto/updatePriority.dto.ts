import { IsNumber, Max, Min } from 'class-validator';

export class UpdatePriorityDto {
  @IsNumber()
  directionId: number;

  @IsNumber()
  @Min(1)
  @Max(Number(process.env.MAX_AMOUNT_DIRECTION))
  priority: number;
}
