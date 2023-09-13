import { ObjectLiteral } from "typeorm";

export type GetOneByAttribute = {
  nameAttr: string;
  valueAttr: string;
};

export enum APIMethodType {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete'
}

export enum APIParameterType {
  BODY_DATA = 'bodyData',
  URL_PARAM = 'urlParam',
  BOTH = 'both'
}


export type CustomeObjectLiteral = { type: ObjectLiteral; name: string };