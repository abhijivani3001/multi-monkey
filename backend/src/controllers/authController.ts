import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import crypto from 'crypto';
import User from './../models/userModel';
import catchAsync from './../utils/catchAsync';
import { AppError } from '../utils/appError';
import { sendPasswordResetEmail, sendWelcomeEmail } from './../utils/email';
import { IUser } from '../interfaces/user';
import {
  IForgetPasswordRequest,
  ILoginRequest,
  IProtectRequest,
  IResetPasswordRequest,
  IRestrictToRequest,
  ISignupRequest,
  IUpdateMyPasswordRequest,
} from '../interfaces/request/auth.request';
import { ICreateSendTokenResponse } from '../interfaces/response/auth.response';
import { PlainResponse } from '../interfaces/response/plain.response';
import getEnvVar from '../utils/getEnvVar';
import Token from '../models/tokenModel';
import { userRoles } from '../constants/roles.constant';
import { accountType } from '../constants/account.constant';

const signToken = (id: string): string => {
  return jwt.sign({ id }, getEnvVar('JWT_SECRET'), {
    expiresIn: getEnvVar('JWT_EXPIRES_IN'),
  });
};

const createSendToken = (
  user: IUser,
  statusCode: number,
  req: Request,
  res: Response
): ICreateSendTokenResponse => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() +
        parseInt(getEnvVar('JWT_COOKIE_EXPIRES_IN')) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  };

  res.cookie('jwt', token, cookieOptions);

  const createSendTokenResponse: ICreateSendTokenResponse = {
    success: true,
    message: 'Please check your email to verify your account',
    token,
    data: {
      user,
    },
  };

  return createSendTokenResponse;
};

const sendTokenForVerification = async (
  user: IUser,
  req: Request,
  res: Response
) => {
  const createSendTokenResponse = createSendToken(user, 201, req, res);

  if (user.verified) {
    // response: user is verified
    createSendTokenResponse.message = 'Login successful';
    return res.status(201).json(createSendTokenResponse);
  }

  // response: user is not verified
  res.status(201).json(createSendTokenResponse);

  // remove all previous tokens for that user
  await Token.deleteMany({ user: user._id });

  const token = await Token.create({
    user: user._id,
    token: createSendTokenResponse.token,
    expires: new Date(
      Date.now() +
        parseInt(getEnvVar('JWT_COOKIE_EXPIRES_IN')) * 24 * 60 * 60 * 1000
    ),
  });

  const url = `${getEnvVar('CLIENT_URL')}/api/users/${user._id}/verify/${
    createSendTokenResponse.token
  }`;
  await sendWelcomeEmail(user, url);
};

export const signup = catchAsync(
  async (req: ISignupRequest, res: Response, next: NextFunction) => {
    const existingUser: IUser | null = await User.findOne({
      email: req.body.email,
    });

    if (existingUser) {
      return next(new AppError('User already exists', 400));
    }

    const newUser: IUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      role: req.body.role ?? userRoles.USER,
      passwordChangedAt: req.body.passwordChangedAt,
      photo: req.body.photo,
    });

    await sendTokenForVerification(newUser, req, res);
  }
);

export const login = catchAsync(
  async (req: ILoginRequest, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError('Please provide email and password!', 400));
    }

    const user: IUser | null = await User.findOne({ email }).select(
      '+password' // select password field explicitly, by default mongoose does not include fields that are marked with select: false in the schema
    );

    if (user && user?.accountType !== accountType.LOCAL) {
      // user has social account but trying to login with local account credentials (email and password) which is not allowed
      return next(new AppError('User does not have local account', 400));
    }

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Incorrect email or password', 401));
    }

    sendTokenForVerification(user, req, res);
  }
);

export const logout = (req: Request, res: Response): void => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  const logoutResponse: PlainResponse = {
    success: true,
    message: 'Logged out successfully',
  };

  res.status(200).json(logoutResponse);
};

const extractToken = (req: Request): string | undefined => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    return req.headers.authorization.split(' ')[1];
  } else if (req.cookies?.jwt) {
    return req.cookies.jwt;
  }
  return undefined;
};

const verifyToken = (token: string): Promise<JwtPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, getEnvVar('JWT_SECRET'), (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded as JwtPayload);
    });
  });
};

export const protect = catchAsync(
  async (req: IProtectRequest, res: Response, next: NextFunction) => {
    const token = extractToken(req);

    if (!token) {
      return next(
        new AppError('You are not logged in! Please log in to get access.', 401)
      );
    }

    const decoded = await verifyToken(token);

    const currentUser: IUser | null = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError(
          'The user belonging to this token does no longer exist.',
          401
        )
      );
    }

    if (currentUser.changedPasswordAfter(decoded.iat ?? 0)) {
      return next(
        new AppError(
          'User recently changed password! Please log in again.',
          401
        )
      );
    }

    req.user = currentUser;
    res.locals.user = currentUser;
    next();
  }
);

// Only for rendered pages, no errors!
export const isLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.cookies.jwt) {
    try {
      const decoded = await verifyToken(req.cookies.jwt);

      const currentUser: IUser | null = await User.findById(decoded.id);
      if (!currentUser || currentUser.changedPasswordAfter(decoded.iat ?? 0)) {
        return next();
      }

      res.locals.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};

export const restrictTo = (...roles: string[]) => {
  return (req: IRestrictToRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
};

export const forgotPassword = catchAsync(
  async (req: IForgetPasswordRequest, res: Response, next: NextFunction) => {
    const user: IUser | null = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(new AppError('There is no user with email address.', 404));
    }

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    try {
      const resetURL = `${req.protocol}://${req.get(
        'host'
      )}/api/users/resetPassword/${resetToken}`;
      await sendPasswordResetEmail(user, resetURL);

      const forgotPasswordResponse: PlainResponse = {
        success: true,
        message: 'Token sent to email!',
      };

      res.status(200).json(forgotPasswordResponse);
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });

      return next(
        new AppError(
          'There was an error sending the email. Try again later!',
          500
        )
      );
    }
  }
);

export const resetPassword = catchAsync(
  async (req: IResetPasswordRequest, res: Response, next: NextFunction) => {
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user: IUser | null = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return next(new AppError('Token is invalid or has expired', 400));
    }
    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    createSendToken(user, 200, req, res);
  }
);

export const updateMyPassword = catchAsync(
  async (req: IUpdateMyPasswordRequest, res: Response, next: NextFunction) => {
    const user: IUser | null = await User.findById(req.user?._id).select(
      '+password'
    );

    if (
      !user ||
      !(await user.correctPassword(req.body.currentPassword, user.password))
    ) {
      return next(new AppError('Your current password is wrong.', 401));
    }

    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    await user.save();
    createSendToken(user, 200, req, res);
  }
);
