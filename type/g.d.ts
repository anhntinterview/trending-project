import 'babel-polyfill';
import 'ts-helpers';

declare global {
  interface Window {}
}

declare module 'next' {
  interface NextApiRequest {
    jwt: string;
  }
}
