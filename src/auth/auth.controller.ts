import {
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Res,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAccessTokenAuthGuard } from './guards/jwt-access-token-auth.guard';
import { JwtRefreshTokenAuthGuard } from './guards/jwt-refresh-token-auth.guard';
import { Response } from 'express';
import { AUTH_API_TAG, JWT_REFRESH_TOKEN_COOKIE_KEY } from './auth.constants';
import { RoleVariant } from '@/common/roles/roles.types';
import { Roles } from '@/common/roles/decorators/roles-auth.decorator';
import {
  ApiBearerAuth,
  ApiCookieAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags(AUTH_API_TAG)
@Controller(AUTH_API_TAG)
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Аутентифицироваться' })
  @UseGuards(LocalAuthGuard)
  @Roles(RoleVariant.SuperAdmin)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Request() req, @Res() res: Response) {
    const { refreshToken, ...restResult } = await this.authService.login(
      req.user,
    );
    res.cookie(JWT_REFRESH_TOKEN_COOKIE_KEY, refreshToken, {
      httpOnly: true,
    });
    res.json(restResult);
    res.send();
    res.end();
  }

  @ApiOperation({ summary: 'Провалидировать Access JWT token' })
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenAuthGuard)
  @Roles(RoleVariant.SuperAdmin)
  @HttpCode(HttpStatus.OK)
  @Get('validateToken')
  validateToken(@Request() req) {
    return this.authService.validateToken(req.user);
  }

  @ApiOperation({
    summary: 'Обновить Access JWT token с помощью Refresh JWT token',
  })
  @ApiCookieAuth()
  @UseGuards(JwtRefreshTokenAuthGuard)
  @Roles(RoleVariant.SuperAdmin)
  @Get('refreshToken')
  @HttpCode(HttpStatus.OK)
  refreshToken(@Request() req) {
    return this.authService.validateToken(req.user);
  }

  @ApiOperation({ summary: 'Выйти из системы' })
  @Get('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res() res: Response) {
    res.clearCookie(JWT_REFRESH_TOKEN_COOKIE_KEY);
    res.json({ result: 'ok' }).send().end();
  }
}
