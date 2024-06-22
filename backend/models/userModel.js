import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = mongoose.Schema({
  username: {
    type: String,
    require: [true, 'Please enter your username'],
    unique: true,
  },
  email: {
    type: String,
    require: [true, 'Please enter your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter valid email'],
  },
  password: {
    type: String,
    require: [true, 'Please enter password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    require: [true, 'Please enter password'],
    minlength: 8,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
});

const User = mongoose.model('User', userSchema);
export default User;
