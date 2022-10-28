import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ArticleEntity } from '../article/article.entity';
import { DirectionEntity } from './direction.entity';

export enum VuzTypeEnum {
  UNIVERSITY = 'university',
  ACADEMY = 'academy',
  INSTITUTE = 'institute',
}

@Entity({ name: 'vuz' })
export class VuzEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  city: string;

  @Column()
  logoUrl: string;

  @Column({ type: 'enum', enum: VuzTypeEnum, default: VuzTypeEnum.INSTITUTE })
  type: string;

  @OneToMany(() => DirectionEntity, (direction) => direction.vuz)
  directions: DirectionEntity[];

  @OneToOne(() => ArticleEntity)
  @JoinColumn()
  article: ArticleEntity;
}
