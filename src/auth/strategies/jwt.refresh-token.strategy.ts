import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayloadDto } from '../dto/jwt-payload.dto';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthHelpers } from '../auth.helpers';
import { UserDto } from '@/auth/dto/user.dto';
import { AuthService } from '@/auth/auth.service';
import { JWT_REFRESH_TOKEN_AUTH_STRATEGY_KEY } from '@/auth/auth.constants';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  JWT_REFRESH_TOKEN_AUTH_STRATEGY_KEY,
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        AuthHelpers.extractJwtRefreshTokenFromCookies,
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('auth.jwt.refresh_token.secret'),
    });
  }

  public async validate(payload: JwtPayloadDto): Promise<UserDto> {
    try {
      return await this.authService.validateUserByJwtPayload(payload);
    } catch (err) {
      throw new UnauthorizedException(
        'Пользователь с таким токеном не найден. Вы не авторизованы.',
      );
    }
  }
}
