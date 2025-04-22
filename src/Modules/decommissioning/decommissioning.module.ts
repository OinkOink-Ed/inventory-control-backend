import { Module } from '@nestjs/common';
import { DecommissioningController } from './decommissioning.controller';
import { DecommissioningService } from './decommissioning.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Decommissioning } from 'src/Modules/decommissioning/entities/Decommissioning';
import { CartridgeDecommissioning } from 'src/Modules/decommissioning/entities/CartridgeDecommissioning';
import { CartridgeModule } from '../cartridge/cartridge.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { MapperProfile } from 'src/common/MapperProfile';

@Module({
  imports: [
    TypeOrmModule.forFeature([Decommissioning, CartridgeDecommissioning]),
    CartridgeModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
  controllers: [DecommissioningController],
  providers: [DecommissioningService, MapperProfile],
})
export class DecommissioningModule {}
