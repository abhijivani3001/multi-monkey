export class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);

    // Ensure statusCode is a number
    if (typeof statusCode !== 'number' || isNaN(statusCode)) {
      throw new TypeError('statusCode must be a number');
    }

    this.statusCode = statusCode;
    this.status = statusCode.toString().startsWith('4') ? 'Fail' : 'Error';
    this.isOperational = true;

    // Capture stack trace for proper error handling
    Error.captureStackTrace(this, this.constructor);
  }
}
