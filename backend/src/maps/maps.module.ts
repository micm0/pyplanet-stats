import { Module } from '@nestjs/common';
import { MapsService } from './maps.service';
import { MapsController } from './maps.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { _Map } from './map.model';

@Module({
  imports: [SequelizeModule.forFeature([_Map])],
  providers: [MapsService],
  controllers: [MapsController],
})
export class MapsModule {}
