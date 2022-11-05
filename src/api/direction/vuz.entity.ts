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
  shortName: string;

  @Column()
  fullName: string;

  @Column()
  city: string;

  @Column()
  withHostel: boolean;

  @Column()
  numberOfStudents: number;

  @Column()
  yearOfFoundation: number;

  @Column()
  logoUrl: string;

  @OneToMany(() => DirectionEntity, (direction) => direction.vuz)
  directions: DirectionEntity[];

  @OneToOne(() => ArticleEntity)
  @JoinColumn()
  article: ArticleEntity;
}
