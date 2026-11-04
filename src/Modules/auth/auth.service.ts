import { PostResponseAuthDto } from "@Modules/auth/dto/PostResponseAuthDto";
import { RefreshToken } from "@Modules/auth/entities/RefreshToken";
import { UserService } from "@Modules/user/user.service";
import {
  BadRequestException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { ServiceRefresh } from "./interfaces/ServiceRefresh";
import { PostlogoutDto } from "./dto/PostLogoutDto";
import { SuccessResponseDto } from "@common/dto/SuccessResponseDto";
import { PostRefreshDto } from "./dto/PostRefreshDto";
import { ServiceForAuthFindUser } from "@Modules/user/service/ServiceForAuthFindUser";
import {
  AccessTokenPayload,
  RefreshTokenPayload,
} from "@common/decorators/types/UserType";

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
    payload: AccessTokenPayload,
  ): Promise<PostResponseAuthDto> {
    const access_token = await this.jwtService.signAsync(payload);

    const refreshPayload: RefreshTokenPayload = {
      sub: {
        id: payload.sub.id,
      },
    };

    const refresh_token = await this.jwtService.signAsync(refreshPayload, {
      secret: this.configService.get<string>("JWT_REFRESH_SECRET"),
      expiresIn: "1d",
    });

    const refreshTokenEntity: ServiceRefresh = {
      token: refresh_token,
      user: {
        id: payload.sub.id,
      },
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    };

    await this.refreshRepo.insert(refreshTokenEntity);

    return {
      access_token,
      refresh_token,
    };
  }

  async signIn(username: string, pass: string): Promise<PostResponseAuthDto> {
    const user: ServiceForAuthFindUser | null =
      await this.usersService.findOneForAuth(username);

    if (!user) {
      throw new UnauthorizedException("Неверный логин или пароль");
    }

    const isPasswordValid = await bcrypt.compare(pass, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException("Неверный логин или пароль");
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, lastname, name, patronimyc, ...profile } = user;
    return await this.generateToken({ sub: profile });
  }

  async refreshToken(refreshToken: PostRefreshDto): Promise<PostRefreshDto> {
    const tokenEntity = await this.refreshRepo.findOne({
      where: { token: refreshToken.token },
      relations: ["user"],
    });

    if (!tokenEntity || tokenEntity.expiresAt < new Date()) {
      throw new UnauthorizedException("Пользователь не авторизован");
    }

    let payload: RefreshTokenPayload;

    try {
      payload = await this.jwtService.verifyAsync<RefreshTokenPayload>(
        refreshToken.token,
        {
          secret: this.configService.get<string>("JWT_REFRESH_SECRET"),
        },
      );
    } catch {
      throw new UnauthorizedException("Пользователь не авторизован");
    }

    const user = await this.usersService.findOne(payload.sub.id);

    if (!user || "error" in user) {
      throw new BadRequestException("Пользователь не найден");
    }

    const accessPayload: AccessTokenPayload = {
      sub: {
        id: user.id,
        role: {
          roleName: user.role.roleName,
        },
      },
    };

    const newAccessToken = await this.jwtService.signAsync(accessPayload);

    return {
      token: newAccessToken,
    };
  }

  async logout(dto: PostlogoutDto): Promise<SuccessResponseDto> {
    const res = await this.refreshRepo.delete({ token: dto.token });

    if (res.affected == 0) {
      throw new UnauthorizedException("Вы не авторизованы в системе!");
    }
    return {
      statusCode: HttpStatus.OK,
      message: "Успешный выход из системы",
    };
  }
}
