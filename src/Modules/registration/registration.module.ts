import { Module } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegistrationController } from './registration.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../common/entities/user';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [RegistrationController],
  providers: [RegistrationService],
})
export class RegistrationModule { }
