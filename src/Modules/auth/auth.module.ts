import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserModule } from '@Modules/user/user.module';
import { AuthController } from '@Modules/auth/auth.controller';
import { AuthService } from '@Modules/auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from '@Modules/auth/entities/RefreshToken';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([RefreshToken]),
    JwtModule.registerAsync({
      global: true,
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_SECRET'),
        signOptions: {
          expiresIn: '30m',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
