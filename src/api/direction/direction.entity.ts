import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { VuzEntity } from './vuz.entity';

@Entity({ name: 'directions' })
export class DirectionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  // Markdown text
  @Column()
  article: string;

  @Column({ nullable: false })
  budgetPlaces: number;

  @Column({ type: 'simple-array' })
  requiredExams: string[];

  @Column({ type: 'simple-array' })
  optionalExams: string[];

  @ManyToOne(() => VuzEntity, (vuz) => vuz.directions)
  vuz: VuzEntity;
}
