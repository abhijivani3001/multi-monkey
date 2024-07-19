import {
  ILoginUserRequest,
  ISignupUserRequest,
} from '@/interfaces/request/user.request';
import axiosInstance from '../axiosInstance';
import { IUserResponse } from '@/interfaces/response/user.response';

export const signupUser = async ({
  name,
  email,
  password,
  confirmPassword,
}: ISignupUserRequest) => {
  try {
    const res: IUserResponse = await axiosInstance.post('/api/users/signup', {
      name,
      email,
      password,
      confirmPassword,
    });
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response.data;
  }
};

export const loginUser = async ({ email, password }: ILoginUserRequest) => {
  try {
    const res: IUserResponse = await axiosInstance.post('/api/users/login', {
      email,
      password,
    });

    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response.data;
  }
};

export const logoutUser = async () => {
  try {
    const res = await axiosInstance.post('/api/users/logout');
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response.data;
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const res = await axiosInstance.post('/api/users/forgotPassword', {
      email,
    });
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response.data;
  }
};

export const resetPassword = async ({
  password,
  confirmPassword,
  token,
}: {
  password: string;
  confirmPassword: string;
  token: string;
}) => {
  try {
    const res = await axiosInstance.patch(`/api/users/resetPassword/${token}`, {
      password,
      confirmPassword,
    });
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response.data;
  }
};

export const getMe = async () => {
  try {
    const res = await axiosInstance.get('/api/users/me');
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response.data;
  }
};
