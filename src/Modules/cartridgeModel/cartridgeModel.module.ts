import { CartridgeModelController } from '@Modules/cartridgeModel/cartridgeModel.controller';
import { CartridgeModelService } from '@Modules/cartridgeModel/cartridgeModel.service';
import { CartridgeModel } from '@Modules/cartridgeModel/entities/CartridgeModel';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CartridgeModel])],
  controllers: [CartridgeModelController],
  providers: [CartridgeModelService],
})
export class CartridgeModelModule {}
