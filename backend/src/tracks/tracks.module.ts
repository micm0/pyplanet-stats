import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Track } from './track.model';

@Module({
  imports: [SequelizeModule.forFeature([Track])],
  providers: [TracksService],
  controllers: [TracksController],
})
export class MapsModule {}
