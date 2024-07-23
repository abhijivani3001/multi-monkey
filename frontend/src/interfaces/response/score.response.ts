import { IScore } from '../score';
import { PlainResponse } from './plain.response';

export interface IGetScoresResponse extends PlainResponse {
  data: {
    scores: IScore[];
  };
}

export interface IPostScoreResponse extends PlainResponse {
  data: {
    newScore: IScore;
  };
}
