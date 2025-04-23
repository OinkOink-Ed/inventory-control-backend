import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { PostResponseAuthDto } from './dto/PostResponseAuthDto';
import { ErrorResponseDto } from 'src/common/dto/ErrorResponseDto';
import { ServiceForAuthFindUserDto } from 'src/Modules/user/dto/ServiceForAuthFindUserDto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  generateToken(payload: any) {
    return this.jwtService.signAsync(payload);
  }

  async signIn(
    nickname: string,
    pass: string,
  ): Promise<PostResponseAuthDto | ErrorResponseDto> {
    const user: ServiceForAuthFindUserDto | null =
      await this.usersService.findOneForAuth(nickname);

    if ('error' in user) {
      throw new UnauthorizedException('неверный логин ил пароль');
    }

    const isPasswordValid = await bcrypt.compare(pass, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...profile } = user;
    return {
      access_token: await this.generateToken({ sub: profile }),
    };
  }
}
