import {
  AutoIncrement,
  Column,
  CreatedAt,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Record } from 'src/records/record.model';

@Table({ tableName: 'player' })
export class Player extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @Column
  login: string;

  @Column
  nickname: string;

  @Column
  last_seen: Date;

  @Column
  total_playtime: number;

  @HasMany(() => Record)
  records: Record[];
}
