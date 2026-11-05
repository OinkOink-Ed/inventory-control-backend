import { ROLES_KEY } from "@common/decorators/Roles";
import { AuthenticatedRequest } from "@common/decorators/types/UserType";
import { RoleName } from "@common/enums/RoleName";
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      throw new ForbiddenException("Роль не определена");
    }

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    const userRole = request.user.sub.role.roleName as RoleName;
    if (!userRole) {
      throw new ForbiddenException("Роль пользователя не получена");
    }

    const hasAccess = requiredRoles.includes(userRole);

    if (!hasAccess) {
      throw new ForbiddenException({
        message: "Доступ запрещен",
      });
    }

    return true;
  }
}
