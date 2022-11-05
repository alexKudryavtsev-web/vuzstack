import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ArticleEntity } from '../article/article.entity';
import { UserEntity } from '../user/user.entity';
import { VuzEntity } from './vuz.entity';

@Entity({ name: 'directions' })
export class DirectionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  budgetPlaces: number;

  @Column()
  code: string;

  @Column({ type: 'longtext' })
  department: string;

  @Column({ type: 'longtext' })
  profile: string;

  @Column()
  type: string;

  @Column({ type: 'simple-array' })
  requiredExams: string[];

  @Column({ type: 'simple-array' })
  optionalExams: string[];

  @ManyToOne(() => VuzEntity, (vuz) => vuz.directions)
  vuz: VuzEntity;

  @OneToMany(() => UserEntity, (user) => user.result)
  abits: UserEntity[];

  @OneToOne(() => ArticleEntity)
  @JoinColumn()
  article: ArticleEntity;
}
