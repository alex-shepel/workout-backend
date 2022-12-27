import { UserEntity } from '@/user/user.entity';

export default interface RegisterResponseInterface
  extends Pick<UserEntity, 'ID' | 'Name' | 'Email'> {
  Token: string;
}
