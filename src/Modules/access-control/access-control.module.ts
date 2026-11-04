import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserModule } from "../user/user.module";
import { Warehouse } from "@Modules/warehouse/entities/Warehouse";

import { AccessControlService } from "./access-control.service";
import { Division } from "@Modules/division/entities/Division";

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Warehouse, Division])],
  providers: [AccessControlService],
  exports: [AccessControlService],
})
export class AccessControlModule {}
