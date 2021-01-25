import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './player.entity';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private playersRepository: Repository<Player>,
  ) {}

  async findAll(): Promise<Player[]> {
    return await this.playersRepository.find();
  }

  async findOne(id: string) {
    return await this.playersRepository.findOne({
      where: { id },
      relations: ['records', 'records.track'],
    });
  }

  async findOneWithRecords(id: string) {
    return await this.playersRepository.findOne({
      where: { id },
      relations: ['records', 'records.track'],
    });
  }
}
