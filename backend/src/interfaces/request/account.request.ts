import { Request } from 'express';

export interface IOAuthLogin extends Request {
  body: {
    type: string;
    provider: string;
    providerAccountId: string;
    providerAccessToken: string;
    expires: Date;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    email: string;
    photo?: string;
    accountType: string;
    verified: boolean;
  };
}
