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

  async findOne(id: string): Promise<Player> {
    return await this.playersRepository.findOne({
      where: { id },
      relations: ['records', 'records.track'],
    });
  }

  async findOneWithRecords(id: string): Promise<Player> {
    return await this.playersRepository.findOne({
      where: { id },
      relations: ['records', 'records.track'],
    });
  }

  async findAllWithAvg(): Promise<any[]> {
    return await this.playersRepository.query(
      `SELECT player.id, player.login, player.nickname, player.last_seen, player.total_playtime, player.updated_at,
      (SUM(LEAST(records.rec, 100)) + (100 * ((SELECT count(*) from map) - COUNT(*)))) AS sum,
      CAST(((SUM(LEAST(records.rec, 100)) + (100 * ((SELECT count(*) from map) - COUNT(*)))) / CAST((SELECT count(*) from map) AS DECIMAL)) AS DECIMAL(5,1)) AS avg
      FROM (SELECT @rec := CASE WHEN @map_id = map_id THEN @rec + 1 ELSE 1 END AS rec, @map_id := map_id map_id, player_id, score FROM localrecord, 
        (SELECT @map_id := 0, @rec := 0) AS dummy WHERE map_id IN (SELECT id FROM map) ORDER BY map_id, score)
      AS records JOIN player ON player.id = records.player_id GROUP BY player_id ORDER BY sum`,
    );
  }
}
