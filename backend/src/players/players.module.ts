import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Player } from './player.model';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';

@Module({
  imports: [SequelizeModule.forFeature([Player])],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule {}
