import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Player } from './players/player.model';
import { PlayersModule } from './players/players.module';
import { Record } from './records/record.model';
import { RecordsModule } from './records/records.module';
import { MapsModule } from './tracks/tracks.module';
import { Track } from './tracks/track.model';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [Record, Player, Track],
    }),
    RecordsModule,
    PlayersModule,
    MapsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
