import { model, Schema } from 'mongoose';
import { typingModes } from '../constants/typingMode.constant';
import { IScore } from '../interfaces/score';

const scoreSchema = new Schema<IScore>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide a user ID'],
  },
  rawWpm: {
    type: Number,
    required: [true, 'Please provide a WPM'],
  },
  netWpm: {
    type: Number,
    required: [true, 'Please provide a net WPM'],
  },
  accuracy: {
    type: Number,
    required: [true, 'Please provide an accuracy'],
  },
  mode: {
    type: {
      type: String,
      enum: [
        typingModes.TIME_MODE,
        typingModes.WORDS_MODE,
        typingModes.QUOTE_MODE,
      ],
      required: [true, 'Please provide a mode type'],
    },
    value: {
      type: Schema.Types.Mixed,
      required: [true, 'Please provide a mode value'],
    },
  },
  date: {
    type: Date,
    required: [true, 'Please provide a date'],
  },
  totalCharacters: {
    type: Number,
    required: [true, 'Please provide a total count'],
  },
  correctCharacters: {
    type: Number,
    required: [true, 'Please provide a correct count'],
  },
  incorrectCharacters: {
    type: Number,
    required: [true, 'Please provide an incorrect count'],
  },
  missedCharacters: {
    type: Number,
    required: [true, 'Please provide a missed count'],
  },
  isHighScore: {
    type: Boolean,
    required: [true, 'Please provide a high score status'],
  },
});

const Score = model<IScore>('Score', scoreSchema);
export default Score;
