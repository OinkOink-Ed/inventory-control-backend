import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartridgeModel } from 'src/Modules/cartridgeModel/entities/CartridgeModel';
import { CartridgeModelService } from './cartridgeModel.service';
import { CartridgeModelController } from './cartridgeModel.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CartridgeModel])],
  controllers: [CartridgeModelController],
  providers: [CartridgeModelService],
})
export class CartridgeModelModule {}
