import { Module } from '@nestjs/common';
import { MovementController } from './movement.controller';
import { MovementService } from './movement.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movement } from 'src/common/entities/Movement';
import { CartridgeMovement } from 'src/common/entities/CartridgeMovement';

@Module({
  imports: [TypeOrmModule.forFeature([Movement, CartridgeMovement])],
  controllers: [MovementController],
  providers: [MovementService],
})
export class MovementModule {}
