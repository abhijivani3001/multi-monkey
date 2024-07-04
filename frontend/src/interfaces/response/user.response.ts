import { IUser } from '../user';
import { PlainResponse } from './plain.response';

export interface IUserResponse extends PlainResponse {
  token: string;
  data: {
    user: IUser | null;
  };
}

export interface IUserError extends IUserResponse {
  field: string | null;
  value: string | null;
  isOperational?: boolean;
}
