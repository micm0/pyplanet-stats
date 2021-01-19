import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Track } from 'src/tracks/track.model';
import { Player } from 'src/players/player.model';
import { Record } from './record.model';

@Injectable()
export class RecordsService {
  constructor(
    @InjectModel(Record)
    private recordModel: typeof Record,
  ) {}

  async findAll(): Promise<Record[]> {
    return this.recordModel.findAll({
      include: [
        { model: Player, attributes: ['id', 'nickname', 'login'] },
        { model: Track, attributes: ['id', 'name', 'uid'] },
      ],
    });
  }

  findOne(id: string): Promise<Record> {
    return this.recordModel.findOne({
      include: [Player, Track],
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const record = await this.findOne(id);
    await record.destroy();
  }
}
