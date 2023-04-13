import { JwtPayloadDto } from '@/auth/dto/jwt-payload.dto';

export type UserJwtPayload = {
  sub: JwtPayloadDto['sub'],
  name: JwtPayloadDto['name'];
  role: JwtPayloadDto['role'];
};
