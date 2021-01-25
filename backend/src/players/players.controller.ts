import { Controller, Get, Param } from '@nestjs/common';
import { Player } from './player.entity';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get()
  getAll(): Promise<Player[]> {
    return this.playersService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Player> {
    return this.playersService.findOne(id);
  }
}
