import mongoose from 'mongoose';

interface Score {
  userId: string;
  rawWpm: number;
  netWpm: number;
  accuracy: number;
  mode: string;
  modeValue: number; // time in seconds for time mode, word count for word mode
  date: Date;
  correct: number;
  incorrect: number;
  missed: number;
  isHighScore: boolean;
  typedString?: string;
}

const scoreSchema = new mongoose.Schema<Score>({
  // wpm, acc, date, netwpm, mode - with duration, userid, correct/incorrect/missed, ishighscore, typedstring vs actuallstring

});
