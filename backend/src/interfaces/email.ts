export interface IEmailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export interface IUserEmail {
  email: string;
  name: string;
}
