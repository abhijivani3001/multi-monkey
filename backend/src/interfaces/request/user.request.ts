import { Request } from 'express';

export interface IGetMeRequest extends Request {
  user: {
    _id: string;
  };
}

export interface IUpdateMeRequest extends Request {
  user: {
    _id: string;
  };
  file?: {
    filename: string;
  };
}

export interface IDeleteMeRequest extends Request {
  user: {
    _id: string;
  };
}

export interface ICreateUserRequest extends Request {
  body: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
    passwordChangedAt: Date;
  };
}

export interface IUpdateUserRequest extends Request {
  params: {
    userId: string;
  };
  body: {
    username: string;
    email: string;
    role: string;
    photo: string;
  };
}

export interface IDeleteUserRequest extends Request {
  params: {
    userId: string;
  };
}
