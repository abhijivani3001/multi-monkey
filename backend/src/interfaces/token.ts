import { Schema } from 'mongoose';

export interface IToken {
  user: Schema.Types.ObjectId;
  token: string;
  expires: Date;
}
