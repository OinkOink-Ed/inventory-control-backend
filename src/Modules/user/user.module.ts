import { MapperProfile } from '@common/MapperProfile';
import { Division } from '@Modules/division/entities/Division';
import { Kabinet } from '@Modules/kabinet/entities/Kabinet';
import { Role } from '@Modules/role/entities/Role';
import { RoleModule } from '@Modules/role/role.module';
import { User } from '@Modules/user/entities/User';
import { UserController } from '@Modules/user/user.controller';
import { UserService } from '@Modules/user/user.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Division, Kabinet]),
    RoleModule,
  ],
  controllers: [UserController],
  providers: [UserService, MapperProfile],
  exports: [UserService],
})
export class UserModule {}
