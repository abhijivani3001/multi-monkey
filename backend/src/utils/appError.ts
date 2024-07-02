export class AppError extends Error {
  statusCode: number;
  success: boolean;
  message: string;
  isOperational: boolean = true;
  field: string | null;
  value: string | null;

  constructor(
    message: string,
    statusCode: number,
    field?: string | null,
    value?: string | null
  ) {
    super(message);

    if (typeof statusCode !== 'number' || isNaN(statusCode)) {
      throw new TypeError('statusCode must be a number');
    }

    this.statusCode = statusCode;
    this.success = false;
    this.message = message;
    this.isOperational = true;
    this.field = field || null;
    this.value = value || null;

    // Capture stack trace for proper error handling
    Error.captureStackTrace(this, this.constructor);
  }
}
