import { Role } from "@db/entity/role.entity";
import { AppDataSource } from "@root/data-source";

const RoleRepository =  AppDataSource.getRepository(Role)

export default RoleRepository 