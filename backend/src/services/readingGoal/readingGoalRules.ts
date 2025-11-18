import { getPool } from '@/utils/database';
import sql from 'mssql';
import { ReadingGoal, SetReadingGoalParams } from './readingGoalTypes';

/**
 * @summary
 * Sets or updates the annual reading goal for a user.
 */
export const setAnnualReadingGoal = async (params: SetReadingGoalParams): Promise<ReadingGoal> => {
  const pool = await getPool();
  const result = await pool
    .request()
    .input('userId', sql.Int, params.userId)
    .input('year', sql.Int, params.year)
    .input('bookCountGoal', sql.Int, params.bookCountGoal)
    .execute('dbo.sp_SetReadingGoal');

  return result.recordset[0];
};
