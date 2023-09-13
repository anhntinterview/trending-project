import { Role } from '@db/entity/role.entity';

export interface RolesDTO {
  list: Array<Role>;
  count: number;
}

export interface RoleRO {
  role: Role;
}
