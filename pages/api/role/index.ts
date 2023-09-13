// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import RoleModule from '@/role/role.module';
import { RolesDTO } from '@/role/role.dto';
import AuthModule from '@/authentication/auth.module';

export default async function handler(req: NextApiRequest, res: NextApiResponse<RolesDTO>) {
  // const authModule = new AuthModule(req, res);

  // await authModule.isAuth(async () => {
  //   const roleModule = new RoleModule<RolesDTO>(req, res);
  //   return await roleModule.getAll();
  // });

  const roleModule = new RoleModule(req, res);
  return await roleModule.crudModule.getAll();
}
