import { Module } from '@nestjs/common';
// import { UsersModule } from './Modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration, { validationSchema } from './common/config/configuration';
import { RoleModule } from 'src/Modules/role/role.module';
// import { CartridgesModule } from './Modules/cartridges/cartridges.module';
// import { AuthModule } from './Modules/auth/auth.module';
// import { Role } from './common/entities/role';
// import { AuthGuard } from './common/guards/AuthGuard';
// import { ModelCartridgesModule } from './Modules/model-cartridges/model-cartridges.module';

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
    // UsersModule,
    // CartridgesModule,
    // AuthModule,
    // ModelCartridgesModule,
    RoleModule,
  ],
  providers: [
    // {
    //   provide: 'APP_GUARD',
    //   useClass: AuthGuard,
    // },
  ],
})
export class AppModule {}
