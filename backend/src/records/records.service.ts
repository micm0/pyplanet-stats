import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Record } from './record.model';

@Injectable()
export class RecordsService {
  constructor(
    @InjectModel(Record)
    private recordModel: typeof Record,
  ) {}

  async findAll(): Promise<Record[]> {
    return this.recordModel.findAll();
  }

  findOne(id: string): Promise<Record> {
    return this.recordModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const record = await this.findOne(id);
    await record.destroy();
  }
}
