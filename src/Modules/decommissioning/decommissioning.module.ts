import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { CartridgeDecommissioning } from '@Modules/decommissioning/entities/CartridgeDecommissioning';
import { Decommissioning } from '@Modules/decommissioning/entities/Decommissioning';
import { CartridgeModule } from '@Modules/cartridge/cartridge.module';
import { DecommissioningController } from '@Modules/decommissioning/decommissioning.controller';
import { DecommissioningService } from '@Modules/decommissioning/decommissioning.service';
import { MapperProfile } from '@common/MapperProfile';
import { AccessControlModule } from '@Modules/access-control/access-control.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Decommissioning, CartridgeDecommissioning]),
    CartridgeModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    AccessControlModule,
  ],
  controllers: [DecommissioningController],
  providers: [DecommissioningService, MapperProfile],
})
export class DecommissioningModule {}
