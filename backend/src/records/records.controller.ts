import { Controller, Get, Param } from '@nestjs/common';
import { Record } from './record.entity';
import { RecordsService } from './records.service';

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

  @Get('track/:id')
  getTrackRecords(@Param('id') id: string): Promise<Record> {
    return this.recordsService.findRecordsOfTrack(id);
  }

  @Get('player/:id')
  getPlayerRecords(@Param('id') id: string): Promise<Record> {
    return this.recordsService.findRecordsOfPlayer(id);
  }
}
