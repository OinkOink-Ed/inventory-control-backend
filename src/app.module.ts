import { Module } from '@nestjs/common';
import { UsersModule } from './Modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration, { validationSchema } from './common/config/configuration';
import { User } from './common/entities/user';
import { CartridgeModule } from './Modules/cartridges/cartridge.module';
import { AuthModule } from './Modules/auth/auth.module';
import { AuthGuard } from './common/guards/AuthGuard';

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
    UsersModule,
    CartridgeModule,
    AuthModule
  ],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard
    }
  ]
})
export class AppModule { }
