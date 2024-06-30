export interface ILoginUserRequest {
  email: string;
  password: string;
}

export interface ISignupUserRequest {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
