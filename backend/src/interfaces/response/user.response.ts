import { IUser } from '../user';
import { PlainResponse } from './plain.response';

export interface IUserResponse extends PlainResponse {
  data: {
    user: IUser | null;
  };
}

export interface IGetAllUsersResponse extends PlainResponse {
  data: {
    users: IUser[];
  };
}
