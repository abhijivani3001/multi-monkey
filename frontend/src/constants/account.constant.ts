import { IAccountType } from '@/interfaces/account';

export const accountType: IAccountType = Object.freeze({
  LOCAL: 'local',
  GOOGLE: 'google',
  GITHUB: 'github',
});
