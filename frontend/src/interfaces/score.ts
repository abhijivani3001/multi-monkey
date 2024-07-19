export interface IScore {
  userId: string;
  rawWpm: number;
  netWpm: number;
  accuracy: number;
  mode: ITypingMode;
  date: Date;
  totalCharacters: number;
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
  type: ITypingModeTypes | string;
  value: number | string; // time in seconds for time mode, word count for word mode, quote for quote mode
}
