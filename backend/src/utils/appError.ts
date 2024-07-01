export class AppError extends Error {
  statusCode: number;
  success: boolean;
  message: string;

  constructor(message: string, statusCode: number) {
    super(message);

    if (typeof statusCode !== 'number' || isNaN(statusCode)) {
      throw new TypeError('statusCode must be a number');
    }

    this.statusCode = statusCode;
    this.success = false;
    this.message = message;

    // Capture stack trace for proper error handling
    Error.captureStackTrace(this, this.constructor);
  }
}
