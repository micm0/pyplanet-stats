import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KarmaController } from './karma.controller';
import { Karma } from './karma.entity';
import { KarmaService } from './karma.service';

@Module({
  imports: [TypeOrmModule.forFeature([Karma])],
  controllers: [KarmaController],
  providers: [KarmaService],
})
export class KarmaModule {}
