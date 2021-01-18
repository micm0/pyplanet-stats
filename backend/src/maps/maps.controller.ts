import { Controller, Get, Param } from '@nestjs/common';
import { _Map } from './map.model';
import { MapsService } from './maps.service';

@Controller('maps')
export class MapsController {
  constructor(private readonly mapsService: MapsService) {}

  @Get()
  getAll(): Promise<_Map[]> {
    return this.mapsService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<_Map> {
    return this.mapsService.findOne(id);
  }
}
