import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { Movement } from '@Modules/movement/entities/Movement';
import { CartridgeMovement } from '@Modules/movement/entities/CartridgeMovement';
import { CartridgeModule } from '@Modules/cartridge/cartridge.module';
import { MovementController } from '@Modules/movement/movement.controller';
import { MovementService } from '@Modules/movement/movement.service';
import { MapperProfile } from '@common/MapperProfile';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movement, CartridgeMovement]),
    CartridgeModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
  controllers: [MovementController],
  providers: [MovementService, MapperProfile],
})
export class MovementModule {}
