export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  passwordConfirm?: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  role: string;
  correctPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;
  changedPasswordAfter(JWTTimestamp: number): boolean;
  createPasswordResetToken(): string;
}
