import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({})
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  title: string;
}
