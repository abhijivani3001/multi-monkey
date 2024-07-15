export interface IAccount {
  type: string;
  provider: string;
  providerAccountId: string;
  userId: string;
  providerAccessToken: string;
  expires: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAccountType {
  readonly LOCAL: string;
  readonly GOOGLE: string;
  readonly GITHUB: string;
}
