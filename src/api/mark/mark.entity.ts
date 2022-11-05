import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

export enum ExamEnum {
  RUSSIAN_LANGUAGE = 'RUSSIAN_LANGUAGE',
  MATH = 'MATH',
  PHYSIC = 'PHYSIC',
  CHEMISTRY = 'CHEMISTRY',
  HISTORY = 'HISTORY',
  SOCIAL_SCIENCE = 'SOCIAL_SCIENCE',
  COMPUTER_SCIENCE = 'COMPUTER_SCIENCE',
  BIOLOGY = 'BIOLOGY',
  FOREIGN_LANGUAGE = 'FOREIGN_LANGUAGE',
  GEOGRAPHY = 'GEOGRAPHY',
}

@Entity({ name: 'marks' })
export class MarkEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ExamEnum })
  exam: ExamEnum;

  @Column()
  result: number;

  @ManyToOne(() => UserEntity, (user) => user.marks)
  user: UserEntity;
}
