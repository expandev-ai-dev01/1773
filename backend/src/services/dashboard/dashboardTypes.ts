export interface GoalProgress {
  booksRead: number;
  goal: number;
}

export interface CurrentlyReadingBook {
  libraryBookId: number;
  title: string;
  author: string;
  coverImageUrl: string | null;
  currentPage: number;
  pageCount: number;
  progressPercentage: number;
}

export interface MonthlyCompletion {
  month: number;
  booksRead: number;
}

export interface Statistics {
  totalPagesReadThisYear: number;
  favoriteGenre: string | null;
  monthlyCompletions: MonthlyCompletion[];
}

export interface DashboardData {
  goalProgress: GoalProgress;
  currentlyReading: CurrentlyReadingBook[];
  statistics: Statistics;
}
