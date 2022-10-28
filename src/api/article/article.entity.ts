import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum ArticleTypeEnum {
  PLATFORM_DESCRIPTION = 'PLATFORM_DESCRIPTION',
  VUZ_DESCRIPTION = 'VUZ_DESCRIPTION',
  DIRECTION_DESCRIPTION = 'DIRECTION_DESCRIPTION',
}

@Entity({ name: 'articles' })
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'longtext' })
  content: string;

  @Column({
    type: 'enum',
    enum: ArticleTypeEnum,
    default: ArticleTypeEnum.PLATFORM_DESCRIPTION,
  })
  type: ArticleTypeEnum;
}
