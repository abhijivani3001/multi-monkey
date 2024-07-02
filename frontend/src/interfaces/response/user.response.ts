import { IUser } from '../user';
import { PlainResponse } from './plain.response';

export interface ISignupUserResponse extends PlainResponse {
  data: {
    user: IUser | null;
  };
  token: string;
}

export interface ISignupUserError extends ISignupUserResponse {
  field: string | null;
  value: string | null;
  isOperational?: boolean;
}
