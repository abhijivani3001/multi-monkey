import { IScore } from '@/interfaces/score';
import axiosInstance from '../axiosInstance';

export const getScores = async ({ id }: { id: string }) => {
  try {
    const res = await axiosInstance.get(`/api/scores/${id}`);
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response.data;
  }
};

export const postScore = async ({
  userId,
  rawWpm,
  netWpm,
  accuracy,
  mode,
  date,
  totalCharacters,
  correctCharacters,
  incorrectCharacters,
  missedCharacters,
  isHighScore,
  typedString,
}: IScore) => {
  try {
    const res = await axiosInstance.post(`/api/scores`, {
      userId,
      rawWpm,
      netWpm,
      accuracy,
      mode,
      date,
      totalCharacters,
      correctCharacters,
      incorrectCharacters,
      missedCharacters,
      isHighScore,
      typedString,
    });
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response.data;
  }
};
