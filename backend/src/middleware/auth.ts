import { Request, Response, NextFunction } from 'express';

// Extend the Request type to include our custom properties
export interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    accountId: number;
  };
}

/**
 * @summary
 * Mock authentication middleware.
 * In a real application, this would validate a JWT or session token.
 * For this feature, it simulates an authenticated user by attaching mock user data to the request object.
 */
export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  // Simulate a logged-in user for development purposes
  // In a real scenario, you would decode a token here.
  req.user = {
    id: 1, // Mock user ID
    accountId: 1, // Mock account ID
  };

  next();
};
