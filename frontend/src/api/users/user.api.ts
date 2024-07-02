import { ISignupUserRequest } from '@/interfaces/request/user.request';
import axiosInstance from '../axiosInstance';

export const signUpUser = async ({
  username,
  email,
  password,
  confirmPassword,
}: ISignupUserRequest) => {
  try {
    const res = await axiosInstance.post('/api/users/signup', {
      username,
      email,
      password,
      confirmPassword,
    });
    console.log(res);
  } catch (error: any) {
    console.error(error.response.data);
  }
};
