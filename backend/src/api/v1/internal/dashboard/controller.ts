import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '@/middleware/auth';
import * as dashboardRules from '@/services/dashboard/dashboardRules';

/**
 * @summary
 * Handles the request to get all dashboard data for the authenticated user.
 */
export const getDashboardData = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.id;
    const data = await dashboardRules.getDashboardData({ userId });
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};
