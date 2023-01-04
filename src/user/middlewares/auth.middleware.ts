import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { IExpressRequest } from '@/types';
import { verify } from 'jsonwebtoken';
import { UserService } from '@/user/user.service';
import { UserEntity } from '@/user/user.entity';

@Injectable()
export default class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: IExpressRequest, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      this.fail(req, next);
      return;
    }

    const authInfo = req.headers.authorization.split(' ');
    if (authInfo.length < 2) {
      this.fail(req, next);
      return;
    }
    const token = authInfo[1];

    let decode;
    try {
      decode = verify(token, process.env.JWT_SECRET);
    } catch (err) {
      this.fail(req, next);
      return;
    }

    if (!decode.hasOwnProperty('ID')) {
      this.fail(req, next);
      return;
    }

    const user = await this.userService.getById(decode.ID);
    if (!user) {
      this.fail(req, next);
      return;
    }

    this.success(user)(req, next);
  }

  success(user: UserEntity) {
    return (req: IExpressRequest, next: NextFunction) => {
      req.user = user;
      next();
    };
  }

  fail(req: IExpressRequest, next: NextFunction) {
    req.user = null;
    next();
  }
}
