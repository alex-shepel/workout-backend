import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ExpressRequest } from '@/types';

const User = createParamDecorator((key: keyof ExpressRequest['user'], ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  if (!request.user) {
    return null;
  }

  if (key) {
    return request.user[key];
  }

  return request.user;
});

export default User;
