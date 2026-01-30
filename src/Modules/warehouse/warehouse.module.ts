import { UserModule } from '@Modules/user/user.module';
import { Warehouse } from '@Modules/warehouse/entities/Warehouse';
import { WarehouseController } from '@Modules/warehouse/warehouse.controller';
import { WarehouseService } from '@Modules/warehouse/warehouse.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Warehouse]), UserModule],
  controllers: [WarehouseController],
  providers: [WarehouseService],
})
export class WarehouseModule {}
