import { Kabinet } from '@Modules/kabinet/entities/Kabinet';
import { KabinetController } from '@Modules/kabinet/kabinet.controller';
import { KabinetService } from '@Modules/kabinet/kabinet.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Kabinet])],
  controllers: [KabinetController],
  providers: [KabinetService],
})
export class KabinetModule {}
