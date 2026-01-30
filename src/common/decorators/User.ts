import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserData } from './types/UserType';

export const User = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext): UserData => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);
