import { Record } from 'src/records/record.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'player' })
export class Player {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column({ type: 'varchar', length: 255 })
  login: string;

  @Column({ type: 'varchar', length: 255 })
  nickname: string;

  @Column()
  last_seen: Date;

  @Column()
  total_playtime: number;

  @OneToMany(() => Record, (record) => record.player)
  records: Record[];
}
