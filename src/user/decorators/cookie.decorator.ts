import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CookieData } from '@/user/types';

const Cookie = createParamDecorator((dataKey: keyof CookieData, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return dataKey ? request.cookies?.[dataKey] : request.cookies;
});

export default Cookie;
