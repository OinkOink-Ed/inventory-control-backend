import { Module } from '@nestjs/common';
import { MovementController } from './movement.controller';
import { MovementService } from './movement.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movement } from 'src/Modules/movement/entities/Movement';
import { CartridgeMovement } from 'src/Modules/movement/entities/CartridgeMovement';
import { CartridgeModule } from '../cartridge/cartridge.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { MapperProfile } from 'src/common/MapperProfile';

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
