import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthHelpers } from './auth.helpers';
import { UserDto } from './dto/user.dto';
import { ConfigService } from '@nestjs/config';
import { UserJwtPayload } from './auth.types';
import { JwtPayloadDto } from '@/auth/dto/jwt-payload.dto';
import { RoleVariant } from '@/common/roles/roles.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async login(dto: UserDto) {
    const { accessToken, refreshToken } = await this.generateUserTokens(dto);

    return {
      accessToken,
      refreshToken,
      user: dto,
    };
  }

  public async validateToken(dto: UserDto) {
    try {
      if (dto.name !== this.configService.get<string>('auth.local.name')) {
        throw new UnauthorizedException(
          `Пользователь ${dto.name} не существует, вы не авторизованы!`,
        );
      }

      const { accessToken, refreshToken } = await this.generateUserTokens(dto);

      return {
        accessToken,
        refreshToken,
        user: dto,
      };
    } catch (err) {
      throw new UnauthorizedException('Токен невалиден, Вы не авторизованы!');
    }
  }

  public async validateUser(dto: Omit<UserDto, 'id'>): Promise<UserDto> {
    if (dto.name !== this.configService.get<string>('auth.local.name')) {
      throw new UnauthorizedException(
        `Пользователя ${dto.name} не существует, вы не авторизованы!`,
      );
    }
    const hashedPassword = await AuthHelpers.hashPassword(
      this.configService.get<string>('auth.local.password'),
    );
    const isPasswordsMatch = await AuthHelpers.comparePasswords(
      dto.password,
      hashedPassword,
    );
    if (!isPasswordsMatch) {
      throw new UnauthorizedException('Неправильный логин или пароль');
    }
    return {
      id: +this.configService.get<string>('auth.local.id'),
      ...dto,
    };
  }

  public async validateUserByJwtPayload(dto: JwtPayloadDto): Promise<UserDto> {
    if (dto.sub !== +this.configService.get<string>('auth.local.id')) {
      throw new UnauthorizedException(
        `Пользователя ${dto.name} не существует, вы не авторизованы!`,
      );
    }
    const hashedPassword = await AuthHelpers.hashPassword(
      this.configService.get<string>('auth.local.password'),
    );
    return {
      id: dto.sub,
      name: dto.name,
      password: hashedPassword,
    };
  }

  private async generateUserTokens(userDto: UserDto) {
    const payload: UserJwtPayload = {
      sub: userDto.id,
      name: userDto.name,
      role: RoleVariant.SuperAdmin,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('auth.jwt.access_token.secret'),
        expiresIn: this.configService.get<string>(
          'auth.jwt.access_token.expires',
        ),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('auth.jwt.refresh_token.secret'),
        expiresIn: this.configService.get<string>(
          'auth.jwt.refresh_token.expires',
        ),
      }),
    ]);
    return { accessToken, refreshToken };
  }
}
