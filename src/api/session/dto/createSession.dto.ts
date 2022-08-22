import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateSessionDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
