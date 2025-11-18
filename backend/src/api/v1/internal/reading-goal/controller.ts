import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '@/middleware/auth';
import * as readingGoalRules from '@/services/readingGoal/readingGoalRules';
import { SetReadingGoalBody } from '@/services/readingGoal/readingGoalTypes';

export const setAnnualReadingGoal = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.id;
    const { year, book_count_goal } = req.body as SetReadingGoalBody;
    const goal = await readingGoalRules.setAnnualReadingGoal({
      userId,
      year,
      bookCountGoal: book_count_goal,
    });
    res.status(200).json({ success: true, data: goal });
  } catch (error) {
    next(error);
  }
};
