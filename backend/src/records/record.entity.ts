import { Player } from 'src/players/player.entity';
import { Track } from 'src/tracks/track.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'localrecord' })
export class Record {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @UpdateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  map_id: number;

  @ManyToOne(() => Track, (track) => track.records)
  @JoinColumn({ name: 'map_id' })
  track: Track;

  @Column()
  player_id: number;

  @ManyToOne(() => Player, (player) => player.records)
  @JoinColumn({ name: 'player_id' })
  player: Player;

  @Column()
  score: number;

  @Column({ type: 'varchar', length: 255 })
  checkpoints: string;
}
