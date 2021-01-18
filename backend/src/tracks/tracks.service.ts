import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Track } from './track.model';

@Injectable()
export class TracksService {
  constructor(
    @InjectModel(Track)
    private mapModel: typeof Track,
  ) {}

  async findAll(): Promise<Track[]> {
    return this.mapModel.findAll();
  }

  findOne(id: string): Promise<Track> {
    return this.mapModel.findByPk(id);
  }
}
