import { Router } from 'express';
import * as readingGoalController from '@/api/v1/internal/reading-goal/controller';
import { authMiddleware } from '@/middleware/auth';
import { validationMiddleware } from '@/middleware/validation';
import { setReadingGoalSchema } from '@/services/readingGoal/readingGoalValidation';

const router = Router();

/**
 * @api {post} /reading-goal Set or update the annual reading goal
 * @apiName SetReadingGoal
 * @apiGroup ReadingGoal
 * @apiVersion 1.0.0
 */
router.post(
  '/',
  authMiddleware,
  validationMiddleware(setReadingGoalSchema),
  readingGoalController.setAnnualReadingGoal
);

export default router;
