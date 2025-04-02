import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration, { validationSchema } from './common/config/configuration';
import { RoleModule } from 'src/Modules/role/role.module';
import { DivisionModule } from './Modules/division/division.module';
import { UserModule } from './Modules/user/user.module';
import { CartridgeModel } from './common/entities/CartridgeModel';
import { AuthModule } from './Modules/auth/auth.module';
import { KabinetModule } from './Modules/kabinet/kabinet.module';
import { StatusModule } from './Modules/status/status.module';
import { WarehouseModule } from './Modules/warehouse/warehouse.module';

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
          // entities: [Role],
          autoLoadEntities: true,
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    CartridgeModel,
    DivisionModule,
    KabinetModule,
    RoleModule,
    StatusModule,
    UserModule,
    WarehouseModule,
  ],
  providers: [
    // {
    //   provide: 'APP_GUARD',
    //   useClass: AuthGuard,
    // },
  ],
})
export class AppModule {}
