import { SetMetadata } from '@nestjs/common';
import { ROLES_METADATA_KEY } from '../roles.symbols';
import { RoleVariant } from '../roles.types';

export const Roles = (...roles: RoleVariant[]) =>
  SetMetadata<symbol, RoleVariant[]>(ROLES_METADATA_KEY, roles);
