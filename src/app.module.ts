import { Module } from '@nestjs/common';
import { UsersModule } from './Modules/Users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration, { validationSchema } from './common/config/configuration';
import { User } from './common/entities/user';
import { CartridgesModule } from './Modules/Cartridges/cartridges.module';
import { AuthModule } from './Modules/Auth/auth.module';
import { AuthGuard } from './common/guards/AuthGuard';
import { ModelCartridges } from './common/entities/modelCartridges';
import { MovementOfTheCartridge } from './common/entities/movementOfTheCartridge';
import { Role } from './common/entities/role';
import { Cartridges } from './common/entities/cartridges';

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
            User,
            ModelCartridges,
            MovementOfTheCartridge,
            Role,
            Cartridges,
          ],
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
    CartridgesModule,
    AuthModule,
  ],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard
    }
  ]
})
export class AppModule { }
