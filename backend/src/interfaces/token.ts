import { ObjectId } from 'mongoose';

export interface IToken {
  user: ObjectId;
  token: string;
  expires: Date;
}
