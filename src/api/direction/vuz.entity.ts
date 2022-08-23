import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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
  article: string;

  @Column({ type: 'enum', enum: VuzTypeEnum, default: VuzTypeEnum.INSTITUTE })
  type: string;

  @OneToMany(() => DirectionEntity, (direction) => direction.vuz)
  directions: DirectionEntity[];
}
