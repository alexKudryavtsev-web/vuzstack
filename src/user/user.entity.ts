import { MarkEntity } from '@app/profile/mark.entity';
import { SessionEntity } from '@app/session/session.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: false })
  isActivated: boolean;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ type: 'uuid' })
  activationLink: string;

  @Column()
  agree: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => SessionEntity, (session) => session.user)
  sessions: SessionEntity[];

  @OneToMany(() => MarkEntity, (mark) => mark.user)
  marks: MarkEntity[];
}
