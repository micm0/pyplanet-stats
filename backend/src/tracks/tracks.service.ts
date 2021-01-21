import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Player } from 'src/players/player.model';
import { Record } from 'src/records/record.model';
import { Track } from './track.model';

@Injectable()
export class TracksService {
  constructor(
    @InjectModel(Track)
    private mapModel: typeof Track,
  ) {}

  async findAll(): Promise<Track[]> {
    return this.mapModel.findAll();
  }

  findOne(id: string): Promise<Track> {
    return this.mapModel.findOne({
      include: [
        {
          model: Record,
          include: [{ model: Player, attributes: ['id', 'nickname', 'login'] }],
        },
      ],
      where: {
        id,
      },
    });
  }
}
