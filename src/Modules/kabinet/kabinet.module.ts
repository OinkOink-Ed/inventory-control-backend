import { Module } from '@nestjs/common';
import { KabinetController } from './kabinet.controller';
import { KabinetService } from './kabinet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kabinet } from 'src/common/entities/Kabinet';

@Module({
  imports: [TypeOrmModule.forFeature([Kabinet])],
  controllers: [KabinetController],
  providers: [KabinetService],
})
export class KabinetModule {}
