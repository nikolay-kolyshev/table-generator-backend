import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWT_REFRESH_TOKEN_AUTH_STRATEGY_KEY } from '@/auth/auth.constants';

@Injectable()
export class JwtRefreshTokenAuthGuard extends AuthGuard(
  JWT_REFRESH_TOKEN_AUTH_STRATEGY_KEY,
) {}
