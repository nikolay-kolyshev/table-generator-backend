import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWT_ACCESS_TOKEN_AUTH_STRATEGY_KEY } from '@/auth/auth.constants';

@Injectable()
export class JwtAccessTokenAuthGuard extends AuthGuard(
  JWT_ACCESS_TOKEN_AUTH_STRATEGY_KEY,
) {}
