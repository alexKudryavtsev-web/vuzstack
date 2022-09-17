import { IsNotEmpty, Matches } from 'class-validator';

export class UploadUserInfoDto {
  @IsNotEmpty()
  @Matches(/^[а-яА-Я]+$/)
  firstName: string;

  @IsNotEmpty()
  @Matches(/^[а-яА-Я]+$/)
  lastName: string;

  @IsNotEmpty()
  @Matches(
    new RegExp(
      '^(https?:\\/\\/)?' +
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
        '((\\d{1,3}\\.){3}\\d{1,3}))' +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        '(\\?[;&a-z\\d%_.~+=-]*)?' +
        '(\\#[-a-z\\d_]*)?$',
      'i',
    ),
  )
  link: string;

  @IsNotEmpty()
  @Matches(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/)
  phone: string;

  @IsNotEmpty()
  @Matches(/^\d{3}-\d{3}-\d{3}-\d{2}$/)
  snils: string;

  @IsNotEmpty()
  @Matches(/^\d{6}$/)
  passportID: string;

  @IsNotEmpty()
  @Matches(/^\d{4}$/)
  passportSeries: string;
}
