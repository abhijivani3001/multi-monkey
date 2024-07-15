import { ObjectId } from 'mongoose';

export interface IAccount {
  type: string;
  provider: string;
  providerAccountId: string;
  userId: ObjectId;
  providerAccessToken: string;
  expires: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAccountType {
  readonly LOCAL: string;
  readonly GOOGLE: string;
  readonly GITHUB: string;
}
