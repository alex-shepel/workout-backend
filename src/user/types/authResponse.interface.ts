import { UserEntity } from '@/user/user.entity';

export default interface IAuthResponse extends Pick<UserEntity, 'ID' | 'Name' | 'Email'> {
  Token: string;
}
