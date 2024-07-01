import { NextFunction, Request, Response } from 'express';
import User from '../models/userModel';
import { AppError } from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import {
  ICreateUserRequest,
  IDeleteMeRequest,
  IDeleteUserRequest,
  IGetMeRequest,
  IUpdateMeRequest,
  IUpdateUserRequest,
} from '../interfaces/request/user.request';
import {
  IGetAllUsersResponse,
  IUserResponse,
} from '../interfaces/response/user.response';

const filterObj = (obj: { [x: string]: any }, ...allowedFields: string[]) => {
  const newObj: { [key: string]: any } = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

export const getMe = catchAsync(
  async (req: IGetMeRequest, res: Response, next: NextFunction) => {
    req.params.userId = req.user._id;
    next();
  }
);

export const updateMe = catchAsync(
  async (req: IUpdateMeRequest, res: Response, next: NextFunction) => {
    if (req.body.password || req.body.confirmPassword) {
      throw new AppError(
        'This route is not for password updates. Please use /updateMyPassword',
        400
      );
    }

    const filteredBody = filterObj(req.body, 'username', 'email');

    // Check if user with new username or email already exists
    const userExists = await User.findOne({
      $or: [{ username: filteredBody.username }, { email: filteredBody.email }],
    });

    if (userExists && userExists._id.toString() !== req.user._id) {
      throw new AppError('Username or email already taken', 400);
    }

    if (req.file) filteredBody.photo = req.file.filename;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      }
    );

    const updatedUserResponse: IUserResponse = {
      success: true,
      message: 'User updated successfully',
      data: {
        user: updatedUser,
      },
    };

    res.status(200).json(updatedUserResponse);
  }
);

export const deleteMe = catchAsync(
  async (req: IDeleteMeRequest, res: Response, next: NextFunction) => {
    await User.findByIdAndUpdate(req.user._id, { active: false });

    const deletedUserResponse: IUserResponse = {
      success: true,
      message: 'User deleted successfully',
      data: {
        user: null,
      },
    };

    res.status(204).json(deletedUserResponse);
  }
);

export const createUser = catchAsync(
  async (req: ICreateUserRequest, res: Response, next: NextFunction) => {
    const user = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });
    if (user) throw new AppError('User already exists', 400);

    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      passwordChangedAt: req.body.passwordChangedAt,
    });

    const createUserResponse: IUserResponse = {
      success: true,
      message: 'User created successfully',
      data: {
        user: newUser,
      },
    };

    res.status(200).json(createUserResponse);
  }
);

export const getUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      throw new AppError('User not found!', 404);
    }

    const getUserResponse: IUserResponse = {
      success: true,
      message: 'User retrieved successfully',
      data: {
        user,
      },
    };

    res.status(200).json(getUserResponse);
  }
);

export const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find();

    const getAllUsersResponse: IGetAllUsersResponse = {
      success: true,
      message: 'Users retrieved successfully',
      data: {
        users,
      },
    };

    res.status(200).json(getAllUsersResponse);
  }
);

export const updateUser = catchAsync(
  async (req: IUpdateUserRequest, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const updates = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      throw new AppError('User not found!', 404);
    }

    const updateUserResponse: IUserResponse = {
      success: true,
      message: 'User updated successfully',
      data: {
        user: updatedUser,
      },
    };

    res.status(200).json(updateUserResponse);
  }
);

export const deleteUser = catchAsync(
  async (req: IDeleteUserRequest, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      throw new AppError('User not found!', 404);
    }

    const deleteUserResponse: IUserResponse = {
      success: true,
      message: 'User deleted successfully',
      data: {
        user: null,
      },
    };

    res.status(200).json(deleteUserResponse);
  }
);
