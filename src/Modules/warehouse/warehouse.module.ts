import { Module } from '@nestjs/common';
import { WarehouseController } from './warehouse.controller';
import { WarehouseService } from './warehouse.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([WarehouseModule])],
  controllers: [WarehouseController],
  providers: [WarehouseService],
})
export class WarehouseModule {}
