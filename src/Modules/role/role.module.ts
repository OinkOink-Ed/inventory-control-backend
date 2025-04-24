import { Role } from '@Modules/role/entities/Role';
import { RoleController } from '@Modules/role/role.controller';
import { RoleService } from '@Modules/role/role.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
