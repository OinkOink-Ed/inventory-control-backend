import { MapperProfile } from '@common/MapperProfile';
import { User } from '@Modules/user/entities/User';
import { UserController } from '@Modules/user/user.controller';
import { UserService } from '@Modules/user/user.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, MapperProfile],
  exports: [UserService],
})
export class UserModule {}
