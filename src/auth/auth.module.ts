import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAccessTokenStrategy } from './strategies/jwt.access-token.strategy';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtRefreshTokenStrategy } from '@/auth/strategies/jwt.refresh-token.strategy';

@Global()
@Module({
  providers: [
    AuthService,
    JwtAccessTokenStrategy,
    JwtRefreshTokenStrategy,
    LocalStrategy,
  ],
  controllers: [AuthController],
  imports: [
    PassportModule,
    JwtModule.register({
      global: true,
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
