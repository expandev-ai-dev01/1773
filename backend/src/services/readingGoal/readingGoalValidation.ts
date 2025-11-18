import { z } from 'zod';

export const setReadingGoalSchema = z.object({
  body: z.object({
    year: z.number().int().min(new Date().getFullYear(), 'Year must be the current year or later'),
    book_count_goal: z.number().int().positive('Goal must be a positive number'),
  }),
});
