import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

interface CustomSocket extends Socket {
  user: any;
}

@Injectable()
export class WsGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToWs().getClient<CustomSocket>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new WsException('Пользователь не авторизован');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);

      request['user'] = payload;
    } catch {
      throw new WsException('Пользователь не авторизован');
    }

    return true;
  }

  //Наверное стоит расширить Request тип, или подумать как можно иначе
  private extractTokenFromHeader(request: any): string | undefined {
    // const [type, token] =
    //   request.handshake.header.authorization?.split(' ') ?? [];
    // return type === 'Bearer' ? token : undefined;
    const tokenFromAuth = request.handshake.auth?.token;
    if (tokenFromAuth) {
      return tokenFromAuth;
    }
  }
}
