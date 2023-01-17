import { JwtPayload } from 'jsonwebtoken';

export default interface TokenPayload extends JwtPayload {
  UserID?: string;
  UserEmail?: string;
  UserLastLogoutDate?: string;
}
