import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { UserService } from "@Modules/user/user.service";
import { AuthenticatedRequest } from "@common/decorators/types/UserType";
import { RoleName } from "@common/enums/RoleName";

@Injectable()
export class CardEditGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    const currentUser = request.user.sub;
    const targetUserId = Number(request.params.id);

    if (currentUser.role.roleName === RoleName.ADMIN) {
      return true;
    }

    if (currentUser.role.roleName !== RoleName.USER) {
      throw new ForbiddenException("Нет прав для редактирования пользователя");
    }

    const [currentUserFromDb, targetUser] = await Promise.all([
      this.userService.findUserForEditAccess(currentUser.id),
      this.userService.findUserForEditAccess(targetUserId),
    ]);

    if (!currentUserFromDb) {
      throw new ForbiddenException("Авторизованный пользователь не найден");
    }

    if (!targetUser) {
      throw new ForbiddenException("Пользователь не найден");
    }

    if (targetUser.role.roleName !== RoleName.STAFF) {
      throw new ForbiddenException(
        "Вы можете редактировать только пользователей с ролью staff",
      );
    }

    const currentUserDivisionIds = currentUserFromDb.division.map(
      (division) => division.id,
    );

    const targetUserDivisionIds = targetUser.division.map(
      (division) => division.id,
    );

    const hasCommonDivision = currentUserDivisionIds.some((divisionId) =>
      targetUserDivisionIds.includes(divisionId),
    );

    if (!hasCommonDivision) {
      throw new ForbiddenException(
        "Пользователь не относится к вашему подразделению",
      );
    }

    return true;
  }
}
