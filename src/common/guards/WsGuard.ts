import type { JwtAccessPayload } from "@common/decorators/types/UserType";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { WsException } from "@nestjs/websockets";
import { Socket } from "socket.io";

interface AuthenticatedSocket extends Socket {
  user: JwtAccessPayload;
}

@Injectable()
export class WsGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const socket = context.switchToWs().getClient<AuthenticatedSocket>();
    const token = this.extractToken(socket);

    if (!token) {
      throw new WsException("Пользователь не авторизован");
    }

    try {
      const payload =
        await this.jwtService.verifyAsync<JwtAccessPayload>(token);

      socket.user = payload;
    } catch {
      throw new WsException("Пользователь не авторизован");
    }

    return true;
  }

  private extractToken(socket: Socket): string | undefined {
    const token = socket.handshake.auth?.token;

    return typeof token === "string" ? token : undefined;
  }
}
