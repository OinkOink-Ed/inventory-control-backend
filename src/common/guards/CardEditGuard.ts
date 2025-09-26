import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from '@Modules/user/user.service';
import { UserData } from '@common/decorators/types/UserType';
import { Request } from 'express';

interface CustomRequest extends Request {
  user: {
    sub: UserData;
    iat: number;
    exp: number;
  };
}

@Injectable()
export class CardEditGuard implements CanActivate {
  constructor(private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<CustomRequest>();
    const user: UserData = request.user.sub;
    const staffId = Number(request.params.id);

    const userAccess = await this.userService.findOneById(staffId);
    const userAuth = await this.userService.findOneById(user.id);

    if (!userAccess || !userAuth) {
      throw new ForbiddenException('Карта staff не найдена');
    }

    // Проверяем совпадение divisions
    const userDivisionIds = userAuth.division.map((div) => div.id);
    const staffDivisionIds = userAccess.division.map((div) => div.id);

    const hasCommonDivision = userDivisionIds.some((id) =>
      staffDivisionIds.includes(id),
    );

    if (!hasCommonDivision) {
      throw new ForbiddenException('Нет прав для редактирования этой карты');
    }

    return true;
  }
}
