import { Module } from '@nestjs/common';
import { MovementController } from './movement.controller';
import { MovementService } from './movement.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movement } from 'src/Modules/movement/entities/Movement';
import { CartridgeMovement } from 'src/Modules/movement/entities/CartridgeMovement';

@Module({
  imports: [TypeOrmModule.forFeature([Movement, CartridgeMovement])],
  controllers: [MovementController],
  providers: [MovementService],
})
export class MovementModule {}
