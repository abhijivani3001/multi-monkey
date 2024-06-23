import mongoose from 'mongoose';
import validator from 'validator';

interface User {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const userSchema = new mongoose.Schema<User>({
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
      validator: function (this: User) {
        return this.password === this.passwordConfirm;
      },
      message: 'Passwords are not the same!',
    },
  },
});

const User = mongoose.model<User>('User', userSchema);
export default User;
