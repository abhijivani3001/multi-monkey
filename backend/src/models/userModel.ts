import mongoose from 'mongoose';
import validator from 'validator';
import { IUser } from '../interfaces/user';

const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: function (this: IUser) {
        return this.password === this.passwordConfirm;
      },
      message: 'Passwords are not the same!',
    },
    select: false,
  },
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;
