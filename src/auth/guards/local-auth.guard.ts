import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { LOCAL_AUTH_STRATEGY_KEY } from '@/auth/auth.constants';

@Injectable()
export class LocalAuthGuard extends AuthGuard(LOCAL_AUTH_STRATEGY_KEY) {}
