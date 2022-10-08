import { SessionEntity } from '../session/session.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DirectionEntity } from '../direction/direction.entity';
import { MarkEntity } from '../mark/mark.entity';
import { ProfileEntity } from '../profile/profile.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: false })
  isActivated: boolean;

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

  @OneToOne(() => ProfileEntity)
  @JoinColumn()
  profile: ProfileEntity;

  @ManyToOne(() => DirectionEntity, (direction) => direction.abits)
  result: DirectionEntity;

  @Column({ default: false })
  isProcessed: boolean;
}
