import { model, Schema } from 'mongoose';
import { IAccount } from '../interfaces/account';
import { accountType } from '../constants/account.constant';

const accountSchema = new Schema<IAccount>(
  {
    type: {
      type: String,
      required: [true, 'Please provide a type'],
      default: 'oAuth',
    },
    provider: {
      type: String,
      enum: [accountType.LOCAL, accountType.GOOGLE, accountType.GITHUB],
      default: accountType.LOCAL,
    },
    providerAccountId: {
      type: String,
      required: [true, 'Please provide a provider account id'],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide a user id'],
    },
    providerAccessToken: {
      type: String,
      required: [true, 'Please provide an provider access token'],
    },
    expires: {
      type: Date,
      required: [true, 'Please provide an expiration date'],
    },
  },
  { timestamps: true }
);

const Account = model<IAccount>('Account', accountSchema);
export default Account;
