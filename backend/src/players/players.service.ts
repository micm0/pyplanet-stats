import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
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

  async findTrackIds(): Promise<any[]> {
    return getConnection()
      .createQueryBuilder()
      .select('id')
      .from('map', 'map_ids')
      .getRawMany();
  }

  async findAllWithAvg(): Promise<any[]> {
    const findTrackIds = await this.findTrackIds();
    const trackIds = findTrackIds.map((idObj) => idObj.id).join(',');
    return await this.playersRepository.query(
      `SELECT player.id, player.nickname, player.login, player.last_seen, player.total_playtime, player.updated_at,
      (SUM(LEAST(records.rec, 100)) + (100 * ((SELECT count(*) from map) - COUNT(*)))) AS sum, 
      CAST(((SUM(LEAST(records.rec, 100)) + (100 * ((SELECT count(*) from map) - COUNT(*)))) / CAST((SELECT count(*) from map) AS DECIMAL)) AS DECIMAL(5,1)) AS avg 
      FROM (
        SELECT 
          CASE WHEN @prevMap = map_id THEN @currentMap:= @currentMap + 1 ELSE @currentMap := 1 AND @prevMap := map_id END AS rec,
          map_id,
          player_id,
          score
        FROM 
          localrecord,
          (SELECT @currentMap := 0) AS c,
          (SELECT @prevMap := 0) AS p
        WHERE map_id IN (${trackIds})
        ORDER BY map_id, score) AS records
      JOIN player ON player.id = records.player_id 
      GROUP BY player_id 
      ORDER BY sum`,
    );
  }
}
