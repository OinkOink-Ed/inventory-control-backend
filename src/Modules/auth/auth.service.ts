import {
  HttpCode,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AccessAuthResponseDto } from './dto/accessAuthresponseDto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  @HttpCode(HttpStatus.OK)
  async signIn(nickname: string, pass: string): Promise<AccessAuthResponseDto> {

    try {
      const user = await this.usersService.findOneForAuth(nickname);

      const { password, ...profile } = user;

      await bcrypt.compare(pass, password);

      return {
        access_token: await this.jwtService.signAsync({ sub: profile }),
      };
    } catch (error) {
      throw new UnauthorizedException({ ...error, message: "Неверный логин или пароль" });
    }
  }
}
