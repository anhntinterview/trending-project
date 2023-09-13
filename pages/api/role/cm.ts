// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import RoleModule from '@/role/role.module';
import { Role } from '@db/entity/role.entity';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Role[]>) {
  const roleModule = new RoleModule(req, res);
  await roleModule.crudModule.createMany();
}
