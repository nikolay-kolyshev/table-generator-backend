import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Strategy } from 'passport-local';
import { UserDto } from '@/auth/dto/user.dto';
import { LOCAL_AUTH_STRATEGY_KEY } from '@/auth/auth.constants';

@Injectable()
export class LocalStrategy extends PassportStrategy(
  Strategy,
  LOCAL_AUTH_STRATEGY_KEY,
) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'name',
    });
  }

  async validate(name: string, password: string): Promise<UserDto> {
    const user = await this.authService.validateUser({
      name,
      password,
    });

    if (!user) {
      throw new UnauthorizedException('Пользователь не найден!');
    }
    return user;
  }
}
