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

  async findRecordsOfPlayer(PlayerId: string): Promise<any> {
    //SELECT a.player_id, a.score, a.map_id, count(b.score)+1 as rank
    //FROM localrecord a left join localrecord b on a.score>b.score and a.map_id=b.map_id
    //WHERE a.player_id = 33
    //group by a.player_id, a.score, a.map_id
    const playerRecords = this.recordsRepository.createQueryBuilder('a');
    playerRecords
      .select('a.*, m.name as map_name, count(b.score)+1 as rank')
      .leftJoin('localrecord', 'b', 'a.score > b.score and a.map_id = b.map_id')
      .leftJoin('map', 'm', 'm.id = a.map_id')
      .where('a.player_id = :PlayerId', { PlayerId })
      .groupBy('a.player_id, a.score, a.map_id');
    return await playerRecords.getRawMany();
  }

  async findRecordsOfTrack(TrackId: string): Promise<any> {
    //SELECT *, p.nickname player_nickname, (SELECT count(*) from localrecord a WHERE a.Score <= b.Score AND map_id = 1) as rank
    //FROM localrecord b LEFT JOIN `player` `p` ON `p`.`id` = `b`.`player_id`
    //WHERE map_id = 1
    //ORDER BY `rank` ASC
    const scores = this.recordsRepository
      .createQueryBuilder('a')
      .select('count(*)')
      .where('a.Score <= b.Score AND map_id = :TrackId', { TrackId });

    const mapRecords = this.recordsRepository.createQueryBuilder('b');
    mapRecords
      .select(`b.*, p.nickname player_nickname`)
      .addSelect('(' + scores.getQuery() + ')', 'rank')
      .leftJoin(Player, 'p', 'p.id = b.player_id')
      .where('b.map_id = :TrackId', { TrackId })
      .orderBy('rank', 'ASC');
    //SELECT *, COUNT(t.Score) AS Rank
    //FROM (SELECT DISTINCT score FROM localrecord WHERE map_id = :id) AS t, localrecord AS s
    //JOIN player p on p.id = s.player_id
    //WHERE s.Score >= t.Score AND map_id = :id
    //GROUP BY s.Id, s.Score
    //ORDER BY s.Score ASC;
    // const scores = this.recordsRepository
    //   .createQueryBuilder()
    //   .select('DISTINCT score')
    //   .where('map_id = :Trackid', { Trackid });

    // const mapRecords = getConnection().createQueryBuilder();
    // mapRecords
    //   .select(`lr.*, p.nickname player_nickname, COUNT(t.score) AS rank`)
    //   .leftJoin(Player, 'p', 'p.id = lr.player_id')
    //   .from('(' + scores.getQuery() + ')', 't')
    //   .addFrom('localrecord', 'lr')
    //   .where('lr.score >= t.score AND lr.map_id = :Trackid', { Trackid })
    //   .groupBy('lr.Id, lr.score')
    //   .orderBy('lr.score', 'ASC');
    return await mapRecords.getRawMany();
  }
}
