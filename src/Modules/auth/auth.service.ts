import { PostResponseAuthDto } from '@Modules/auth/dto/PostResponseAuthDto';
import { RefreshToken } from '@Modules/auth/entities/RefreshToken';
import { UserService } from '@Modules/user/user.service';
import {
  BadRequestException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { ServiceRefresh } from './interfaces/ServiceRefresh';
import { PostlogoutDto } from './dto/PostLogoutDto';
import { SuccessResponseDto } from '@common/dto/SuccessResponseDto';
import { PostRefreshDto } from './dto/PostRefreshDto';
import { ServiceForAuthFindUser } from '@Modules/user/service/ServiceForAuthFindUser';
import { ServiceForFindUser } from '@Modules/user/service/ServiceFindUser';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @InjectRepository(RefreshToken)
    private readonly refreshRepo: Repository<RefreshToken>,
  ) {}

  async generateToken(
    payload: {
      sub: { id: number };
    },
    roleName: string,
    lastname: string,
    name: string,
    patronimyc: string,
  ): Promise<PostResponseAuthDto> {
    const access_token = await this.jwtService.signAsync(payload);
    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: '1d',
    });

    const user = await this.usersService.findOne(payload.sub.id);

    const refreshTokenEntity: ServiceRefresh = {
      token: refresh_token,
      user: { id: user?.id ? user.id : 0 },
      expiresAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    };

    await this.refreshRepo.insert(refreshTokenEntity);

    return {
      access_token,
      refresh_token,
      id: payload.sub.id,
      role: { roleName },
      lastname,
      name,
      patronimyc,
    };
  }

  async signIn(username: string, pass: string): Promise<PostResponseAuthDto> {
    const user: ServiceForAuthFindUser | null =
      await this.usersService.findOneForAuth(username);

    if (!user) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }

    const isPasswordValid = await bcrypt.compare(pass, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, lastname, name, patronimyc, ...profile } = user;
    return await this.generateToken(
      { sub: profile },
      user.role.roleName,
      lastname,
      name,
      patronimyc,
    );
  }

  async refreshToken(refreshToken: PostRefreshDto): Promise<PostRefreshDto> {
    const tokenEntity = await this.refreshRepo.findOne({
      where: { token: refreshToken.token },
      relations: ['user'],
    });

    if (!tokenEntity || tokenEntity.expiresAt < new Date()) {
      throw new UnauthorizedException('Пользователь не авторизован');
    }

    //Но пассворд то нет
    let payload: { sub: ServiceForFindUser };
    try {
      payload = await this.jwtService.verifyAsync(refreshToken.token, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });
    } catch (error) {
      throw new UnauthorizedException(error, 'Пользователь не авторизован');
    }

    const user = await this.usersService.findOne(payload.sub.id);
    if (!user || 'error' in user) {
      throw new BadRequestException('Пользователь не найден');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const newAccessToken = await this.jwtService.signAsync({ sub: user });

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
