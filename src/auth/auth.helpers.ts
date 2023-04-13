import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { JWT_REFRESH_TOKEN_COOKIE_KEY } from './auth.constants';

export class AuthHelpers {
  private static salt = 5;

  static async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.salt);
  }

  static extractJwtRefreshTokenFromCookies(req: Request): string | null {
    if (
      req.cookies &&
      JWT_REFRESH_TOKEN_COOKIE_KEY in req.cookies &&
      req.cookies[JWT_REFRESH_TOKEN_COOKIE_KEY].length > 0
    ) {
      return req.cookies[JWT_REFRESH_TOKEN_COOKIE_KEY];
    }
    return null;
  }
}
