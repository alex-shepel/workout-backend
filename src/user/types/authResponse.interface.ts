import { UserEntity } from '@/user/user.entity';

export default interface AuthResponse extends Pick<UserEntity, 'ID' | 'Name' | 'Email'> {
  AccessToken: string;
}
