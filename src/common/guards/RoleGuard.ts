import { ROLES_KEY } from '@common/decorators/Roles';
import { UserData } from '@common/decorators/types/UserType';
import { UserService } from '@Modules/user/user.service';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      throw new ForbiddenException('Роль не определена');
    }

    const request = context.switchToHttp().getRequest();
    const user: UserData = request.user.sub;

    if (!user || !user.id) {
      console.log('ID пользователя не получен');
      throw new ForbiddenException('ID пользователя не получен');
    }

    const userWithRole = await this.userService.findOne(user.id);

    const hasAccess = requiredRoles.some((role) =>
      userWithRole?.role.roleName.includes(role),
    );

    if (!hasAccess) {
      throw new ForbiddenException({
        message: 'Доступ запрещен',
      });
    }

    return true;
  }
}
