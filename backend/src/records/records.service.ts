import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from 'src/players/player.entity';
import { getConnection, Repository } from 'typeorm';
import { Record } from './record.entity';

@Injectable()
export class RecordsService {
  constructor(
    @InjectRepository(Record)
    private recordsRepository: Repository<Record>,
  ) {}

  findAll(): Promise<Record[]> {
    return this.recordsRepository.find({
      relations: ['player', 'track'],
    });
  }

  findOne(id: string): Promise<Record> {
    return this.recordsRepository.findOne({
      where: { id },
      relations: ['player', 'track'],
    });
  }

  async findRecords(Trackid: string): Promise<any> {
    //SELECT *, COUNT(t.Score) AS Rank
    //FROM (SELECT DISTINCT score FROM localrecord WHERE map_id = :id) AS t, localrecord AS s
    //JOIN player p on p.id = s.player_id
    //WHERE s.Score >= t.Score AND map_id = :id
    //GROUP BY s.Id, s.Score
    //ORDER BY s.Score ASC;
    const scores = this.recordsRepository
      .createQueryBuilder()
      .select('DISTINCT score')
      .where('map_id = :Trackid', { Trackid });

    const mapRecords = getConnection().createQueryBuilder();
    mapRecords
      .select(`lr.*, p.nickname player_nickname, COUNT(t.score) AS rank`)
      .leftJoin(Player, 'p', 'p.id = lr.player_id')
      .from('(' + scores.getQuery() + ')', 't')
      .addFrom('localrecord', 'lr')
      .where('lr.score >= t.score AND lr.map_id = :Trackid', { Trackid })
      .groupBy('lr.Id, lr.score')
      .orderBy('lr.score', 'ASC');
    return await mapRecords.getRawMany();
  }
}
