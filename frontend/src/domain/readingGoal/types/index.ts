export interface ReadingGoal {
  id: number;
  year: number;
  book_count_goal: number;
  user_id: string;
}

export interface SetReadingGoalDto {
  year: number;
  book_count_goal: number;
}
