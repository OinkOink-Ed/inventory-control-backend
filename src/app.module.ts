import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration, { validationSchema } from './common/config/configuration';
import { AuthModule } from 'src/Modules/auth/auth.module';
import { CartridgeModule } from 'src/Modules/cartridge/cartridge.module';
import { CartridgeModelModule } from 'src/Modules/cartridgeModel/cartridgeModel.module';
import { DecommissioningModule } from 'src/Modules/decommissioning/decommissioning.module';
import { DeliveryModule } from 'src/Modules/delivery/delivery.module';
import { DivisionModule } from 'src/Modules/division/division.module';
import { KabinetModule } from 'src/Modules/kabinet/kabinet.module';
import { MovementModule } from 'src/Modules/movement/movement.module';
import { ReceivingModule } from 'src/Modules/receiving/receiving.module';
import { RoleModule } from 'src/Modules/role/role.module';
import { UserModule } from 'src/Modules/user/user.module';
import { WarehouseModule } from 'src/Modules/warehouse/warehouse.module';

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
          autoLoadEntities: true,
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    CartridgeModule,
    CartridgeModelModule,
    DecommissioningModule,
    DeliveryModule,
    DivisionModule,
    KabinetModule,
    MovementModule,
    ReceivingModule,
    RoleModule,
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
