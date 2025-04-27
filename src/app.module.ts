import configuration from '@common/config/configuration';
import { validationSchema } from '@common/config/validationShema';
import { AuthModule } from '@Modules/auth/auth.module';
import { CartridgeModule } from '@Modules/cartridge/cartridge.module';
import { CartridgeModelModule } from '@Modules/cartridgeModel/cartridgeModel.module';
import { DecommissioningModule } from '@Modules/decommissioning/decommissioning.module';
import { DeliveryModule } from '@Modules/delivery/delivery.module';
import { DivisionModule } from '@Modules/division/division.module';
import { KabinetModule } from '@Modules/kabinet/kabinet.module';
import { MovementModule } from '@Modules/movement/movement.module';
import { ReceivingModule } from '@Modules/receiving/receiving.module';
import { RoleModule } from '@Modules/role/role.module';
import { UserModule } from '@Modules/user/user.module';
import { WarehouseModule } from '@Modules/warehouse/warehouse.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

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
          synchronize: false,
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
