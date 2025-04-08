import {
  HttpCode,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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

  @HttpCode(HttpStatus.OK)
  async signIn(nickname: string, pass: string): Promise<AuthResponseDto> {
    try {
      const user = await this.usersService.findOneForAuth(nickname);

      const { password, ...profile } = user;

      await bcrypt.compare(pass, password);

      return {
        access_token: await this.generateToken({ sub: profile }),
      };
    } catch (error) {
      throw new UnauthorizedException({
        ...error,
        message: 'Неверный логин или пароль',
      });
    }
  }
}
