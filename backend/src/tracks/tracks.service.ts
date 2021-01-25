import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from './track.entity';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
  ) {}

  findAll(): Promise<Track[]> {
    return this.tracksRepository.find();
  }

  findOne(id: string): Promise<any> {
    return this.tracksRepository.findOne({
      where: { id },
    });
  }

  findOneWithRecords(id: string): Promise<any> {
    return this.tracksRepository.findOne({
      where: { id },
      relations: ['records', 'records.player'],
    });
  }
}
