import { Request, Response, NextFunction } from 'express';
import { HttpException } from '@/utils/httpException';
import { config } from '@/config';

export const errorMiddleware = (
  error: HttpException | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error instanceof HttpException ? error.status : 500;
  const message = error.message || 'Something went wrong';

  console.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);

  const errorResponse = {
    success: false,
    status,
    message,
    stack: config.nodeEnv === 'development' ? error.stack : undefined,
  };

  res.status(status).json(errorResponse);
};
