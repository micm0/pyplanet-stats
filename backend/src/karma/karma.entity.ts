import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'karma' })
export class Karma {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column()
  map_id: number;

  @Column()
  player_id: number;

  @Column()
  score: number;

  @Column()
  expanded_score: number;
}
