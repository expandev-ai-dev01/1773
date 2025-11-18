import { LibraryBook } from '@/domain/library/types';

export interface ReadingGoal {
  id: number;
  year: number;
  book_count_goal: number;
  books_read_count: number;
}

export interface ReadingStats {
  totalPagesRead: number;
  favoriteGenre: string | null;
  booksReadByMonth: { month: string; count: number }[];
}

export interface DashboardData {
  readingGoal: ReadingGoal | null;
  currentlyReading: LibraryBook[];
  stats: ReadingStats;
}
