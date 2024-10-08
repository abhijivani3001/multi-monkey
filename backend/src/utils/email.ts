import nodemailer, { Transporter } from 'nodemailer';
import { IUser } from '../interfaces/user';
import { IEmailOptions } from '../interfaces/email';
import getEnvVar from './getEnvVar';

// create a transporter
const createTransport = (): Transporter<any> => {
  return nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    host: getEnvVar('EMAIL_HOST')!,
    port: Number(getEnvVar('EMAIL_PORT')!),
    auth: {
      user: getEnvVar('EMAIL_USERNAME')!,
      pass: getEnvVar('EMAIL_PASSWORD')!,
    },
  });
};

// send an email with provided options
const sendEmail = async (options: IEmailOptions): Promise<void> => {
  try {
    const transporter = createTransport();
    await transporter.sendMail(options);
    console.log(`Email sent to ${options.to}`);
  } catch (error) {
    console.error(`Error sending email: ${error}`);
  }
};

export const sendWelcomeEmail = async (
  user: IUser,
  url: string
): Promise<void> => {
  const html = `
    <div>
      <h1>Welcome to the Multi Monkey, ${user.name}!</h1>
      <p>We're excited to have you on board. Please visit the following link to get started:</p>
      <a href="${url}">Get Started</a>
    </div>
  `;

  await sendEmail({
    from: getEnvVar('EMAIL_FROM')!,
    to: user.email,
    subject: 'Welcome to the Multi Monkey!',
    html,
  });
};

// send a reset-password email
export const sendPasswordResetEmail = async (
  user: IUser,
  url: string
): Promise<void> => {
  const html = `
    <div>
      <h1>Password Reset</h1>
      <p>Hi ${user.name},</p>
      <p>You requested a password reset. Click the link below to reset your password. This link is valid for 10 minutes.</p>
      <a href="${url}">Reset Password</a>
    </div>
  `;

  await sendEmail({
    from: getEnvVar('EMAIL_FROM')!,
    to: user.email,
    subject: 'Your password reset token (valid for only 10 minutes)',
    html,
  });
};
