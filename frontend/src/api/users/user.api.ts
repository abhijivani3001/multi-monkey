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
