import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import Score from '../models/scoreModel';
import {
  IGetScoresResponse,
  IPostScoreResponse,
} from '../interfaces/response/score.response';

export const getScores = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const scores = await Score.find({ userId: id });

    const getScoresResponse: IGetScoresResponse = {
      success: true,
      message: 'Scores retrieved successfully',
      data: {
        scores,
      },
    };

    res.status(200).json(getScoresResponse);
  }
);

export const postScore = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newScore = await Score.create(req.body);

    const postScoreResponse: IPostScoreResponse = {
      success: true,
      message: 'Score added successfully',
      data: {
        newScore,
      },
    };

    res.status(201).json(postScoreResponse);
  }
);
