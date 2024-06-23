import { NextFunction, Request, Response } from 'express';
import User from '../models/userModel';
import { AppError } from '../utils/appError';
import catchAsync from '../utils/catchAsync';

export const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email }: { email: string } = req.body;

    const user = await User.findOne({ email });
    if (user) throw new AppError('User already exists', 400);

    const newUser = await User.create(req.body);

    res.status(200).json({
      status: 'Success',
      data: {
        user: newUser,
      },
    });
  }
);

export const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find();

    res.status(200).json({
      status: 'Success',
      data: {
        users,
      },
    });
  }
);

export const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const updates = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      throw new AppError('User not found!', 404);
    }

    res.status(200).json({
      status: 'Success',
      data: {
        user: updatedUser,
      },
    });
  }
);

export const deleteUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      throw new AppError('User not found!', 404);
    }

    res.status(200).json({
      status: 'Success',
      message: 'User deleted successfully',
    });
  }
);
