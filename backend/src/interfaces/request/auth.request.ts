import { Request } from 'express';
import { IUser } from '../user';

export interface ISignupRequest extends Request {
  body: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role?: string;
    passwordChangedAt: Date;
  };
}

export interface ILoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

export interface IProtectRequest extends Request {
  user: IUser;
}

export interface IRestrictToRequest extends Request {
  user?: IUser;
}

export interface IForgetPasswordRequest extends Request {
  body: {
    email: string;
  };
}

export interface IResetPasswordRequest extends Request {
  params: {
    token: string;
  };
  body: {
    password: string;
    confirmPassword: string;
  };
}

export interface IUpdateMyPasswordRequest extends Request {
  user: IUser;
  body: {
    currentPassword: string;
    password: string;
    confirmPassword: string;
  };
}
