import { Controller, Get, Param } from '@nestjs/common';
import { Track } from './track.model';
import { TracksService } from './tracks.service';

@Controller('tracks')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  getAll(): Promise<Track[]> {
    return this.tracksService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Track> {
    return this.tracksService.findOne(id);
  }
}
