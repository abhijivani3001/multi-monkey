import { IUser } from '../user';
import { PlainResponse } from './plain.response';

export interface ICreateSendTokenResponse extends PlainResponse {
  token: string;
  data: {
    user: IUser
  }
}
