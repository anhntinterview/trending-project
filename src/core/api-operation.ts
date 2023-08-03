import type { NextApiRequest, NextApiResponse } from 'next';
import { AppDataSource } from '@root/data-source';
import { EntityTarget, ObjectLiteral } from 'typeorm';
import { MethodType } from './method';
import { Service } from 'typedi';

@Service()
class ApiOperation {
  

  async initialize(): Promise<void> {
    await AppDataSource.initialize();
  }

  async destroy(): Promise<void> {
    await AppDataSource.destroy();
  }

  // private _result: Array<unknown> | Object;

  
  // public get result() : Array<unknown> | Object {
  //   return this._result
  // }

  // public set result(args: Array<unknown> | Object) {
  //   this._result = args
  // }

  // async handler(method: MethodType) {
  //   switch (method) {
  //     case MethodType.GET:
  //       try {
  //         await AppDataSource.initialize();
  //         const rs = this.result;
  //         await AppDataSource.destroy();
  //         this.res.status(200).json(rs);
  //       } catch (error: any) {
  //         return this.res.status(400).json({ message: error.message });
  //       }
  //       break;
  //     default:
  //       break;
  //   }
  // }
}

export default ApiOperation;
