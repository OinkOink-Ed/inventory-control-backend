import { Module } from '@nestjs/common';
import { UsersModule } from './Modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration, { validationSchema } from './common/config/configuration';
import { User } from './common/entities/user';
import { CartridgesModule } from './Modules/cartridges/cartridges.module';
import { AuthModule } from './Modules/auth/auth.module';
import { CartridgeModels } from './common/entities/cartridgeModels';
import { Role } from './common/entities/role';
import { Cartridges } from './common/entities/cartridges';
import { RoleModule } from './Modules/role/role.module';
// import { AuthGuard } from './common/guards/AuthGuard';
import { Movements } from './common/entities/movements';
import { ModelCartridgesModule } from './Modules/model-cartridges/model-cartridges.module';
import { Division } from './common/entities/divisions';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true,
      validationSchema: validationSchema,
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
            CartridgeModels,
            Role,
            Cartridges,
            Movements,
            Division,
          ],
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
    CartridgesModule,
    AuthModule,
    RoleModule,
    ModelCartridgesModule,
  ],
  providers: [
    // {
    //   provide: 'APP_GUARD',
    //   useClass: AuthGuard,
    // },
  ],
})
export class AppModule {}
