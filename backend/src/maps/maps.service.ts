import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { _Map } from './map.model';

@Injectable()
export class MapsService {
  constructor(
    @InjectModel(_Map)
    private mapModel: typeof _Map,
  ) {}

  async findAll(): Promise<_Map[]> {
    return this.mapModel.findAll();
  }

  findOne(id: string): Promise<_Map> {
    return this.mapModel.findOne({
      where: {
        id,
      },
    });
  }
}
