import { Request } from 'express';
import { UserEntity } from '@/user/user.entity';

export default interface IExpressRequest extends Request {
  user?: UserEntity;
}
