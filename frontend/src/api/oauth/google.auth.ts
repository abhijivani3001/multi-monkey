import { ILoginWithGoogleRequest } from '@/interfaces/request/account.request';
import axiosInstance from '../axiosInstance';

export const loginWithGoogle = async ({
  type,
  provider,
  providerAccountId,
  providerAccessToken,
  expires,
  createdAt,
  updatedAt,
  name,
  email,
  photo,
  accountType,
  verified,
}: ILoginWithGoogleRequest) => {
  try {
    const res = await axiosInstance.post('/api/users/loginWithGoogle', {
      type,
      provider,
      providerAccountId,
      providerAccessToken,
      expires,
      createdAt,
      updatedAt,
      name,
      email,
      photo,
      accountType,
      verified,
    });

    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response.data;
  }
};
