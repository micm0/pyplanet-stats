import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Record } from 'src/records/record.model';
import { Player } from './player.model';

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
      include: [Record],
      where: {
        id,
      },
    });
  }
}
