import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

export enum ExamEnum {
  RUSSIAN_LANGUAGE = 'russian_language',
  MATH = 'math',
  PHYSIC = 'physic',
  CHEMISTRY = 'chemistry',
  HISTORY = 'history',
  SOCIAL_SCIENCE = 'social_science',
  COMPUTER_SCIENCE = 'computer_science',
  BIOLOGY = 'biology',
  FOREIGN_LANGUAGE = 'foreign_language',
}

@Entity({ name: 'exam' })
export class ExamEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ExamEnum })
  exam: ExamEnum;

  @Column()
  result: number;

  @ManyToOne(() => UserEntity, (user) => user.exams)
  user: UserEntity;
}
