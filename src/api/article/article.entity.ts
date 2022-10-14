import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DirectionEntity } from '../direction/direction.entity';
import { VuzEntity } from '../direction/vuz.entity';

export enum ArticleTypeEnum {
  PLATFORM_DESCRIPTION = 'PLATFORM_DESCRIPTION',
  VUZ_DESCRIPTION = 'VUZ_DESCRIPTION',
  DIRECTION_DESCRIPTION = 'DIRECTION_DESCRIPTION',
}

@Entity({ name: 'articles' })
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({
    type: 'enum',
    enum: ArticleTypeEnum,
    default: ArticleTypeEnum.PLATFORM_DESCRIPTION,
  })
  type: ArticleTypeEnum;

  @OneToOne(() => VuzEntity, (vuz) => vuz.article)
  vuz: VuzEntity;

  @OneToOne(() => DirectionEntity, (direction) => direction.article)
  direction: DirectionEntity;
}
