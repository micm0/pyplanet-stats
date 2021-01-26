import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KarmasController } from './karmas.controller';
import { Karma } from './karma.entity';
import { KarmasService } from './karmas.service';

@Module({
  imports: [TypeOrmModule.forFeature([Karma])],
  controllers: [KarmasController],
  providers: [KarmasService],
})
export class KarmasModule {}
