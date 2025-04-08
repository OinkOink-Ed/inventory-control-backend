import { Module } from '@nestjs/common';
import { DecommissioningController } from './decommissioning.controller';
import { DecommissioningService } from './decommissioning.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Decommissioning } from 'src/Modules/decommissioning/entities/Decommissioning';
import { CartridgeDecommissioning } from 'src/Modules/decommissioning/entities/CartridgeDecommissioning';

@Module({
  imports: [
    TypeOrmModule.forFeature([Decommissioning, CartridgeDecommissioning]),
  ],
  controllers: [DecommissioningController],
  providers: [DecommissioningService],
})
export class DecommissioningModule {}
