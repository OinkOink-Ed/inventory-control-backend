import { Module } from '@nestjs/common';
import { RegistrationModule } from './Modules/createUser/createUser.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration, { validationSchema } from './common/config/configuration';
import { User } from './common/entities/user';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true,
      validationSchema: validationSchema
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get<string>('database.host'),
          port: configService.get<number>('database.port'),
          username: configService.get<string>('database.user'),
          password: configService.get<string>('database.password'),
          database: configService.get<string>('database.name'),
          synchronize: true,
          entities: [
            User
          ],
        };
      },
      inject: [ConfigService],
    }),
    RegistrationModule],
})
export class AppModule { }
