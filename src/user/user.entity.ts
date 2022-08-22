import { MarkEntity } from '@app/profile/mark.entity';
import { SessionEntity } from '@app/session/session.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserStatusEnum {
  PASSWORD_UPLOAD = 'PASSWORD_UPLOAD',
  EXAMS_UPLOAD = 'EXAMS_UPLOAD',
  DIRECTION_UPLOAD = 'DIRECTION_UPLOAD',
}

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: UserStatusEnum,
    default: UserStatusEnum.PASSWORD_UPLOAD,
  })
  status: string;

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

  @Column({ default: null, nullable: true })
  acceptedWithCookie: boolean;

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

  @OneToOne(() => MarkEntity)
  @JoinColumn()
  mark: MarkEntity;
}
