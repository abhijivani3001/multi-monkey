import { IOAuthLoginRequest } from '@/interfaces/request/account.request';
import axiosInstance from '../axiosInstance';

export const oAuthLogin = async ({
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
}: IOAuthLoginRequest) => {
  try {
    const res = await axiosInstance.post('/api/users/oAuthLogin', {
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
