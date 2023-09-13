import { Container, Service } from 'typedi';
import RoleService from '@/role/role.service';

@Service()
class RoleController {
  private roleService = Container.get(RoleService);
  constructor() {}
}

export default RoleController;
