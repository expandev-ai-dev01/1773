import { getPool } from '@/utils/database';
import sql from 'mssql';
import { DashboardData } from './dashboardTypes';

interface CurrentlyReadingRecord {
  libraryBookId: number;
  title: string;
  author: string;
  coverImageUrl: string | null;
  currentPage: number;
  pageCount: number;
}

interface MonthlyCompletionRecord {
  month: number;
  booksRead: number;
}

/**
 * @summary
 * Retrieves all data required for the user's dashboard.
 * This includes reading goal progress, currently reading books, and various statistics.
 */
export const getDashboardData = async (params: { userId: number }): Promise<DashboardData> => {
  const pool = await getPool();
  const currentYear = new Date().getFullYear();

  const result = await pool
    .request()
    .input('userId', sql.Int, params.userId)
    .input('year', sql.Int, currentYear)
    .execute('dbo.sp_GetDashboardData');

  const recordsets = result.recordsets as sql.IRecordSet<any>[];

  const goalProgress = recordsets[0][0] || { booksRead: 0, goal: 0 };
  const currentlyReading = recordsets[1];
  const stats = recordsets[2][0] || { totalPagesRead: 0, favoriteGenre: null };
  const monthlyCompletions = recordsets[3];

  return {
    goalProgress: {
      booksRead: goalProgress.booksRead,
      goal: goalProgress.goal,
    },
    currentlyReading: currentlyReading.map((book: CurrentlyReadingRecord) => ({
      libraryBookId: book.libraryBookId,
      title: book.title,
      author: book.author,
      coverImageUrl: book.coverImageUrl,
      currentPage: book.currentPage,
      pageCount: book.pageCount,
      progressPercentage: book.pageCount > 0 ? (book.currentPage / book.pageCount) * 100 : 0,
    })),
    statistics: {
      totalPagesReadThisYear: stats.totalPagesRead,
      favoriteGenre: stats.favoriteGenre,
      monthlyCompletions: monthlyCompletions.map((month: MonthlyCompletionRecord) => ({
        month: month.month,
        booksRead: month.booksRead,
      })),
    },
  };
};
