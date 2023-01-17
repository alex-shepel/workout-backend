import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CookiePayload } from '@/user/types';

const Cookie = createParamDecorator((dataKey: keyof CookiePayload, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return dataKey ? request.cookies?.[dataKey] : request.cookies;
});

export default Cookie;
