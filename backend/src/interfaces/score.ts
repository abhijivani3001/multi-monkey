import { ObjectId } from 'mongoose';

export interface IScore {
  userId: ObjectId;
  rawWpm: number;
  netWpm: number;
  accuracy: number;
  mode: ITypingMode;
  date: Date;
  correctCharacters: number;
  incorrectCharacters: number;
  missedCharacters: number;
  isHighScore: boolean;
  typedString?: string;
}

export interface ITypingModeTypes {
  readonly TIME_MODE: string;
  readonly WORDS_MODE: string;
  readonly QUOTE_MODE: string;
}

export interface ITypingMode {
  type: ITypingModeTypes;
  value: number; // time in seconds for time mode, word count for word mode
}
