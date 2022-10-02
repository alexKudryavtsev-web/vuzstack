import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  firstName: string;

  @Column({ default: '' })
  lastName: string;

  @Column({ default: '' })
  phone: string;

  @Column({ default: '' })
  link: string;

  @Column({ default: '' })
  snils: string;

  @Column({ default: '' })
  passportID: string;

  @Column({ default: '' })
  passportSeries: string;

  @Column({ default: null, nullable: true })
  acceptedWithCookie: boolean;

  @Column({ nullable: true })
  passport: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ default: false })
  ready: boolean;

  @Column({ default: false })
  userInfoUploaded: boolean;
}
