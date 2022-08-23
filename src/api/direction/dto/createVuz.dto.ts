import { IsEnum, IsString } from 'class-validator';
import { VuzTypeEnum } from '../vuz.entity';

export class CreateVuzDto {
  @IsString()
  name: string;

  @IsString()
  city: string;

  @IsString()
  article: string;

  @IsEnum(VuzTypeEnum)
  type: VuzTypeEnum;
}
