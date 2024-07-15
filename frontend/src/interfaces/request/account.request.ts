export interface ILoginWithGoogleRequest {
  type: string;
  provider: string;
  providerAccountId: string;
  providerAccessToken: string;
  expires: string;
  createdAt?: string;
  updatedAt?: string;
  name: string;
  email: string;
  photo?: string;
  accountType: string;
  verified: boolean;
}
