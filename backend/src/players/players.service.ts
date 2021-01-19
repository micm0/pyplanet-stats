import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Record } from 'src/records/record.model';
import { Player } from './player.model';
import { Track } from 'src/tracks/track.model';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel(Player)
    private playerModel: typeof Player,
  ) {}

  async findAll(): Promise<Player[]> {
    return this.playerModel.findAll();
  }

  findOne(id: string): Promise<Player> {
    return this.playerModel.findOne({
      include: [
        {
          model: Record,
          include: [{ model: Track, attributes: ['id', 'name', 'uid'] }],
        },
      ],
      where: {
        id,
      },
    });
  }
}
