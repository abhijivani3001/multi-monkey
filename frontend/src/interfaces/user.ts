export interface IUser {
  save(arg0?: { validateBeforeSave: boolean }): unknown;
  _id: string;
  name: string;
  email: string;
  role: string;
  photo?: string;
  password: string;
  confirmPassword?: string;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  correctPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;
  changedPasswordAfter(JWTTimestamp: number): boolean;
  createPasswordResetToken(): string;
  active?: boolean;
  verified: boolean;
}

export interface IUserRoles {
  readonly ADMIN: string;
  readonly USER: string;
}
