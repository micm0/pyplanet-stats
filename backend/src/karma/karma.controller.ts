import { Controller, Get, Param } from '@nestjs/common';
import { Karma } from './karma.entity';
import { KarmaService } from './karma.service';

@Controller('karma')
export class KarmaController {
  constructor(private readonly karmasService: KarmaService) {}

  @Get()
  findAll(): Promise<Karma[]> {
    return this.karmasService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') trackId: string): Promise<any> {
    return this.karmasService.findOneForMap(trackId);
  }
}
