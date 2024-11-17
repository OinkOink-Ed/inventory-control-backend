import { Module } from '@nestjs/common';
import { RegistrationModule } from './Modules/registration/registration.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [RegistrationModule, ConfigModule.forRoot()],
})
export class AppModule { }
