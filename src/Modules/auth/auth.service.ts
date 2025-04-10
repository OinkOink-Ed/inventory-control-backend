import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { AuthResponseDto } from './dto/AuthResponseDto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  generateToken(payload: any) {
    return this.jwtService.signAsync(payload);
  }

  async signIn(nickname: string, pass: string): Promise<AuthResponseDto> {
    const user = await this.usersService.findOneForAuth(nickname);

    if (!user) {
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
