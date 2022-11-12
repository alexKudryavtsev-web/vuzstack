import { Max, Min } from 'class-validator';

export class ImportDto {
  @Min(1)
  @Max(170)
  deep: number;
}
