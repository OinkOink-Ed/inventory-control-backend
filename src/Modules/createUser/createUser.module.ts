import { Module } from '@nestjs/common';
import { CreateUserService } from './createUser.service';
import { CreateUserController } from './createUser.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../common/entities/user';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [CreateUserController],
  providers: [CreateUserService],
})
export class RegistrationModule { }
