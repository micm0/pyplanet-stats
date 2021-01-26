import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Karma } from './karma.entity';

@Injectable()
export class KarmasService {
  constructor(
    @InjectRepository(Karma)
    private karmaRepository: Repository<Karma>,
  ) {}

  async findAll(): Promise<Karma[]> {
    return await this.karmaRepository.find();
  }

  async findForMap(trackId: string): Promise<Karma[]> {
    return await this.karmaRepository.find({
      where: { map_id: trackId },
    });
  }

  async findSumForMap(trackId: string): Promise<any> {
    return await this.karmaRepository
      .createQueryBuilder()
      .select('SUM(score)', 'karma')
      .where('map_id = :trackId', { trackId })
      .getRawOne();
  }
  //SELECT 100*SUM(score)/COUNT(score) FROM `karma` Karma WHERE map_id = 4
}
