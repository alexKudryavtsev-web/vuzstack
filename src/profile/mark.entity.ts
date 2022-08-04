import { UserEntity } from '@app/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'marks' })
export class MarkEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'simple-json' })
  exam: { subject: string; result: number };

  @Column({ type: 'simple-array' })
  achievements: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.marks)
  user: UserEntity;
}
