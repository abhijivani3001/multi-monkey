import { ISignupUserRequest } from '@/interfaces/request/user.request';
import axiosInstance from '../axiosInstance';
import { ISignupUserResponse } from '@/interfaces/response/user.response';

export const signupUser = async ({
  username,
  email,
  password,
  confirmPassword,
}: ISignupUserRequest) => {
  try {
    const res: ISignupUserResponse = await axiosInstance.post(
      '/api/users/signup',
      {
        username,
        email,
        password,
        confirmPassword,
      }
    );
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response.data;
  }
};
