import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "@common/decorators/SkipAuth";
import {
  AuthenticatedRequest,
  JwtTokenPayload,
} from "@common/decorators/types/UserType";
import { UserService } from "@Modules/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException("Пользователь не авторизован");
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtTokenPayload>(token);
      const roleNameUser = await this.userService.findOneForAuthById(
        payload.sub,
      );

      if (!roleNameUser) {
        throw new UnauthorizedException("Пользователь не авторизован");
      }

      request.user = {
        sub: payload.sub,
        roleName: roleNameUser?.role.roleName,
      };
    } catch {
      throw new UnauthorizedException("Пользователь не авторизован");
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
