import { Controller, Get, Param } from '@nestjs/common';
import { Karma } from './karma.entity';
import { KarmasService } from './karmas.service';

@Controller('karma')
export class KarmasController {
  constructor(private readonly karmasService: KarmasService) {}

  @Get()
  findAll(): Promise<Karma[]> {
    return this.karmasService.findAll();
  }

  @Get(':id')
  getKarmasOfMap(@Param('id') trackId: string): Promise<any> {
    return this.karmasService.findForMap(trackId);
  }

  @Get('sum/:id')
  getSumOfMap(@Param('id') trackId: string): Promise<any> {
    return this.karmasService.findSumForMap(trackId);
  }
}
