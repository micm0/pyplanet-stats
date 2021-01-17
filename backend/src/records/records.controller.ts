import { Controller, Get, Param } from '@nestjs/common';
import { RecordsService } from './records.service';
import { Record } from './record.model';

@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Get()
  getAll(): Promise<Record[]> {
    return this.recordsService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Record> {
    return this.recordsService.findOne(id);
  }
}
