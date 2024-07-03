import { Schema, model } from 'mongoose';
import { IToken } from '../interfaces/token';

const tokenSchema = new Schema<IToken>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  token: {
    type: String,
    required: true,
  },
  expires: {
    type: Date,
    required: true,
    default: Date.now() + 10 * 60 * 1000, // 10 minutes
  },
});

const Token = model<IToken>('Token', tokenSchema);
export default Token;
