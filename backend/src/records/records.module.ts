import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Record } from './record.model';
import { RecordsController } from './records.controller';
import { RecordsService } from './records.service';

@Module({
  imports: [SequelizeModule.forFeature([Record])],
  providers: [RecordsService],
  controllers: [RecordsController],
})
export class RecordsModule {}
