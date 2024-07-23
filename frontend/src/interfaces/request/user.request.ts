export interface ILoginUserRequest {
  email: string;
  password: string;
}

export interface ISignupUserRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  photo: string;
}
