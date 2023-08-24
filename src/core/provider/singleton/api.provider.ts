import { NextApiRequest, NextApiResponse } from 'next';
import { DeleteResult } from 'typeorm';
import ApiOperationBase from '@/core/provider/api-operation.base';
import ApiOperationProvider from '@/core/provider/api-operation.provider';
import MethodProvider from '@/core/provider/method.provider';
import { validate } from 'class-validator';

class ApiProvider<T> extends ApiOperationBase<T> {
  private readonly methodProvider = new MethodProvider<T>(this.req, this.res);
  private readonly apiOperationProvider = new ApiOperationProvider<T>(this.req, this.res);

  constructor(protected readonly req: NextApiRequest, protected readonly res: NextApiResponse<T>) {
    super(req, res);
  }

  public async handleHttpRequestResponse(
    method: string,
    callback: (id?: undefined | string | Array<string>, bodyData?: T | string) => Promise<void | T | DeleteResult>,
    hasParam?: boolean,
    hasBodyData?: boolean,
    isValidate?: boolean
  ) {
    if (hasParam) {
      const { id } = this.req.query;
      if (id) {
        await this.methodProvider[method](() => this.apiOperationProvider.execute(() => callback(id)));
      } else {
        return this.apiOperationProvider.sendErrorResponse({ message: 'id was not defined' });
      }
    } else if (hasBodyData) {
      const { bodyData } = this.req.body;

      if (bodyData) {
        if (Array.isArray(bodyData)) {
          bodyData.map(async (item) => {
            const singleRecordErrors = await validate(item as object);
            if (isValidate && singleRecordErrors.length > 0) {
              return this.apiOperationProvider.sendErrorResponse({
                message: singleRecordErrors.map((err) => err.constraints)
              });
            }
          });
          await this.methodProvider[method](() => this.apiOperationProvider.execute(() => callback(undefined, bodyData as T)));
        } else {
          const bodyDataErrors = await validate(bodyData as object);
          if (isValidate && bodyDataErrors.length > 0) {
            return this.apiOperationProvider.sendErrorResponse({
              message: bodyDataErrors.map((err) => err.constraints)
            });
          } else {
            await this.methodProvider[method](() => this.apiOperationProvider.execute(() => callback(undefined, bodyData)));
          }
        }
      } else {
        return this.apiOperationProvider.sendErrorResponse({ message: 'body-data was not defined' });
      }
    } else {
      await this.methodProvider[method](() => this.apiOperationProvider.execute(() => callback()));
    }
  }
}

export default ApiProvider;
