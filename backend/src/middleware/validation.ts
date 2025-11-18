import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

/**
 * @summary
 * Creates a middleware function that validates request data against a Zod schema.
 * It validates `body`, `query`, and `params` of the request.
 * If validation fails, it sends a 400 response with the validation errors.
 */
export const validationMiddleware =
  (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorDetails = error.errors.map((e) => ({
          path: e.path.join('.'),
          message: e.message,
        }));
        return res
          .status(400)
          .json({ success: false, error: 'Validation failed', details: errorDetails });
      }
      return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  };
