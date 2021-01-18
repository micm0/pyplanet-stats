import {
  AutoIncrement,
  Column,
  CreatedAt,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'map' })
export class _Map extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @Column
  uid: string;

  @Column
  name: string;

  @Column
  file: string;

  @Column
  author_login: string;

  @Column
  author_nickname: string;

  @Column
  environment: string;

  @Column
  title: string;

  @Column
  num_checkpoints: number;

  @Column
  time_author: number;

  @Column
  time_bronze: number;

  @Column
  time_silver: number;

  @Column
  time_gold: number;

  @Column
  mx_id: number;
}
