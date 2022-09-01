import { SessionEntity } from '@app/api/session/session.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DirectionEntity } from '../direction/direction.entity';
import { MarkEntity } from '../mark/mark.entity';

export enum UserStatusEnum {
  PASSWORD_UPLOAD = 'PASSWORD_UPLOAD',
  MARKS_UPLOAD = 'MARKS_UPLOAD',
  DIRECTIONS_UPLOAD = 'DIRECTIONS_UPLOAD',
  AWAITING_RESULT = 'AWAITING_RESULT',
  GET_RESULT = 'GET_RESULT',
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

  @OneToMany(() => MarkEntity, (mark) => mark.user)
  marks: MarkEntity[];

  @Column({ type: 'simple-array' })
  priority: string[];

  @ManyToMany(() => DirectionEntity)
  @JoinTable()
  directions: DirectionEntity[];
}
