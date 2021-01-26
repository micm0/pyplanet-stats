import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersModule } from './players/players.module';
import { RecordsModule } from './records/records.module';
import { TracksModule } from './tracks/tracks.module';
import { KarmasModule } from './karma/karmas.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    PlayersModule,
    RecordsModule,
    TracksModule,
    KarmasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
