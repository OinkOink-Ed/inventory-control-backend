import { PostResponseAuthDto } from '@Modules/auth/dto/PostResponseAuthDto';
import { RefreshToken } from '@Modules/auth/entities/RefreshToken';
import { ServiceForAuthFindUserDto } from '@Modules/user/dto/ServiceForAuthFindUserDto';
import { UserService } from '@Modules/user/user.service';
import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { ServiceRefreshDto } from './dto/ServiceRefreshDto';
import { PostlogoutDto } from './dto/PostLogoutDto';
import { SuccessResponseDto } from '@common/dto/SuccessResponseDto';
import { PostRefreshDto } from './dto/PostRefreshDto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @InjectRepository(RefreshToken)
    private readonly refreshRepo: Repository<RefreshToken>,
  ) {}

  async generateToken(payload: any): Promise<PostResponseAuthDto> {
    const access_token = await this.jwtService.signAsync(payload);

    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: '1d',
    });

    const user = await this.usersService.findOne(payload.sub.username);

    const refreshTokenEntity: ServiceRefreshDto = {
      token: refresh_token,
      user: { id: user.id },
      expiresAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    };

    await this.refreshRepo.insert(refreshTokenEntity);

    return { access_token, refresh_token };
  }

  async signIn(username: string, pass: string): Promise<PostResponseAuthDto> {
    const user: ServiceForAuthFindUserDto | null =
      await this.usersService.findOneForAuth(username);

    if (!user) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }

    const isPasswordValid = await bcrypt.compare(pass, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...profile } = user;
    return await this.generateToken({ sub: profile });
  }

  async refreshToken(refreshToken: PostRefreshDto): Promise<PostRefreshDto> {
    const tokenEntity = await this.refreshRepo.findOne({
      where: { token: refreshToken.token },
      relations: ['user'],
    });

    if (!tokenEntity || tokenEntity.expiresAt < new Date()) {
      throw new UnauthorizedException(
        'Недействительный или истёкший refresh_token',
      );
    }

    //Но пассворд то нет
    let payload: { sub: ServiceForAuthFindUserDto };
    try {
      payload = await this.jwtService.verifyAsync(refreshToken.token, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });
    } catch (error) {
      throw new UnauthorizedException(error, 'Недействительный refresh_token');
    }

    const user = await this.usersService.findOneForAuth(payload.sub.username);
    if (!user || 'error' in user) {
      throw new UnauthorizedException('Пользователь не найден');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...profile } = user;
    const newAccessToken = await this.jwtService.signAsync({ sub: profile });

    return { token: newAccessToken };
  }

  async logout(dto: PostlogoutDto): Promise<SuccessResponseDto> {
    const res = await this.refreshRepo.delete({ token: dto.token });

    if (res.affected == 0) {
      throw new UnauthorizedException('Вы не авторизованы в системе!');
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Успешный выход из системы',
    };
  }
}
