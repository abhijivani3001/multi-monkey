import { NextFunction, Request, Response } from 'express';
import User from '../models/userModel';

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (user) throw new Error('User already exists');

    const newUser = await User.create(req.body);

    res.status(200).json({
      status: 'Success',
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'Fail',
      message: 'ERROR 💥: ' + error,
    });
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: 'Success',
      data: {
        users,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'Fail',
      message: 'ERROR 💥: ' + error,
    });
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const updates = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({
        status: 'Fail',
        message: 'User not found!',
      });
    }

    res.status(200).json({
      ststus: 'Success',
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'Fail',
      message: 'ERROR 💥: ' + error,
    });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({
        status: 'Fail',
        message: 'User not found!',
      });
    }

    res.status(200).json({
      ststus: 'Success',
      message: 'User deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      status: 'Fail',
      message: 'ERROR 💥: ' + error,
    });
  }
};
