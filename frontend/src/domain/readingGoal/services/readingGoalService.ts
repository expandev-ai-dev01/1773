import { authenticatedClient } from '@/core/lib/api';
import { ReadingGoal, SetReadingGoalDto } from '../types';

/**
 * @service readingGoalService
 * @summary Service for managing user's reading goal.
 * @domain readingGoal
 * @type api-service
 */
export const readingGoalService = {
  /**
   * @endpoint POST /reading-goal
   * @summary Sets or updates the annual reading goal for the user.
   */
  async setAnnualReadingGoal(goalData: SetReadingGoalDto): Promise<ReadingGoal> {
    const response = await authenticatedClient.post<{ data: ReadingGoal }>(
      '/reading-goal',
      goalData
    );
    return response.data.data;
  },
};
