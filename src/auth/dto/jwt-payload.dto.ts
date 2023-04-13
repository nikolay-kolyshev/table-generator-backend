import { RoleVariant } from '@/common/roles/roles.types';

export class JwtPayloadDto {
  sub: number;
  name: string;
  role: RoleVariant;
  exp: number;
}
