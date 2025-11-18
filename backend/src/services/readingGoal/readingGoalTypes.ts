export interface ReadingGoal {
  id: number;
  user_id: number;
  year: number;
  book_count_goal: number;
  created_at: string;
  updated_at: string;
}

// API Input Types
export interface SetReadingGoalBody {
  year: number;
  book_count_goal: number;
}

export interface SetReadingGoalParams {
  userId: number;
  year: number;
  bookCountGoal: number;
}
