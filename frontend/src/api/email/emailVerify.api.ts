import axiosInstance from '../axiosInstance';

export const emailVerify = async (url: string) => {
  try {
    const res = await axiosInstance.get(url);
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response.data;
  }
};
