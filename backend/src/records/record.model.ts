import {
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { _Map } from 'src/maps/map.model';
import { Player } from 'src/players/player.model';

@Table({ tableName: 'localrecord' })
export class Record extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @ForeignKey(() => _Map)
  @Column
  map_id: number;

  @BelongsTo(() => _Map)
  map: _Map;

  @ForeignKey(() => Player)
  @Column
  player_id: number;

  @BelongsTo(() => Player)
  player: Player;

  @Column
  score: number;

  @Column
  checkpoints: string;
}
