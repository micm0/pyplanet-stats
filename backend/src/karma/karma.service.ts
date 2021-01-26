import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Karma } from './karma.entity';

@Injectable()
export class KarmaService {
  constructor(
    @InjectRepository(Karma)
    private karmaRepository: Repository<Karma>,
  ) {}

  async findAll(): Promise<any> {
    return await this.karmaRepository.find();
  }

  async findOneForMap(trackId: string): Promise<any> {
    return await this.karmaRepository
      .createQueryBuilder()
      .select('SUM(score)', 'karma')
      .where('map_id = :trackId', { trackId })
      .getRawOne();
  }
}
