import { ROLES_KEY } from '@common/decorators/Roles';
import { UserData } from '@common/decorators/types/UserType';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      console.log('Роль не определена');
      throw new ForbiddenException('Роль не определена');
    }

    const request = context.switchToHttp().getRequest();
    const user: UserData = request.user.sub;

    if (!user || !user.role) {
      console.log('Роль пользователя не получена');
      throw new ForbiddenException('Роль пользователя не получена');
    }

    const hasAccess = requiredRoles.some((role) =>
      user.role.roleName.includes(role),
    );

    if (!hasAccess) {
      throw new ForbiddenException({
        message: 'Доступ запрещен',
      });
    }

    return true;
  }
}
