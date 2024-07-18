import { NextFunction, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { IOAuthLogin } from '../interfaces/request/account.request';
import Account from '../models/accountModel';
import User from '../models/userModel';
import { AppError } from '../utils/appError';
import jwt from 'jsonwebtoken';
import getEnvVar from '../utils/getEnvVar';

export const oAuthLogin = catchAsync(
  async (req: IOAuthLogin, res: Response, next: NextFunction) => {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      const updatedAccount = await Account.findOneAndUpdate(
        { providerAccountId: req.body.providerAccountId },
        {
          providerAccessToken: req.body.providerAccessToken,
          expires: req.body.expires,
        },
        { new: true }
      );

      const token = jwt.sign(
        { id: existingUser._id },
        getEnvVar('JWT_SECRET'),
        {
          expiresIn: getEnvVar('JWT_EXPIRES_IN'),
        }
      );

      const loginWithExistingUserResponse = {
        success: true,
        message: 'Login successful',
        data: {
          token,
          user: existingUser,
        },
      };

      return res.status(200).json(loginWithExistingUserResponse);
    }

    try {
      const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        photo: req.body?.photo,
        accountType: req.body.accountType,
        verified: req.body.verified,
      });

      const newAccount = await Account.create({
        type: req.body.type,
        provider: req.body.provider,
        providerAccountId: req.body.providerAccountId,
        userId: newUser._id,
        providerAccessToken: req.body.providerAccessToken,
        expires: req.body.expires,
      });

      const token = jwt.sign({ id: newUser._id }, getEnvVar('JWT_SECRET'), {
        expiresIn: getEnvVar('JWT_EXPIRES_IN'),
      });

      const loginWithNewUserResponse = {
        success: true,
        message: 'Login successful',
        data: {
          token,
          user: newUser,
        },
      };

      return res.status(201).json(loginWithNewUserResponse);
    } catch (error) {
      console.error('Error creating user or account:', error);

      return next(
        new AppError('Error creating user or account. Please try again.', 500)
      );
    }
  }
);
