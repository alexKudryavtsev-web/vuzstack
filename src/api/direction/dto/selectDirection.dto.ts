import { IsNumber } from 'class-validator';

export class SelectDirectionDto {
  @IsNumber()
  directionId: number;
}
