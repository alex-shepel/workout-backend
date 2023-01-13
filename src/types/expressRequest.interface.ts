import { Request } from 'express';
import { UserEntity } from '@/user/user.entity';

export default interface ExpressRequest extends Request {
  user?: UserEntity;
}
