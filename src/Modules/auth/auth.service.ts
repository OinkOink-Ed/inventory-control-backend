import { PostResponseAuthDto } from '@Modules/auth/dto/PostResponseAuthDto';
import { ServiceForAuthFindUserDto } from '@Modules/user/dto/ServiceForAuthFindUserDto';
import { UserService } from '@Modules/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  generateToken(payload: any) {
    return this.jwtService.signAsync(payload);
  }

  async signIn(username: string, pass: string): Promise<PostResponseAuthDto> {
    const user: ServiceForAuthFindUserDto | null =
      await this.usersService.findOneForAuth(username);

    if ('error' in user) {
      throw new UnauthorizedException('неверный логин или пароль');
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
