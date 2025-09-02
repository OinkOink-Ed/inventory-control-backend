import { UserService } from '@Modules/user/user.service';
import { ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class AccessControlService {
  constructor(private readonly userService: UserService) {}

  async getAccessWarehouse(userDtoId: number, userId: number) {
    const divisionIds = await this.userService.getDivisionOfUser(userId);

    if (!divisionIds.some((item) => userDtoId === item))
      throw new ForbiddenException(
        'У вас нет доступа к складу этого подразделения',
      );
  }
}
