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
}

export interface ITypingMode {
  type: keyof ITypingModeTypes | string;
  value: number; // time in seconds for time mode, word count for word mode
  enableNumbers: boolean; // whether numbers are enabled or disabled
  enablePunctuation: boolean; // whether punctuation is enabled or disabled
}
