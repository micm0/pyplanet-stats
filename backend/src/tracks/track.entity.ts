import { Record } from 'src/records/record.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'map' })
export class Track {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column({ type: 'varchar', length: 50 })
  uid: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  file: string;

  @Column({ type: 'varchar', length: 100 })
  author_login: string;

  @Column({ type: 'varchar', length: 150 })
  author_nickname: string;

  @Column({ type: 'varchar', length: 30 })
  environment: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column()
  num_checkpoints: number;

  @Column()
  time_author: number;

  @Column()
  time_bronze: number;

  @Column()
  time_silver: number;

  @Column()
  time_gold: number;

  @Column()
  mx_id: number;

  @OneToMany(() => Record, (record) => record.track)
  records: Record[];
}
