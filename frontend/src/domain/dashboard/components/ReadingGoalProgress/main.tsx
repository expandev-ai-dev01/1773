import { ReadingGoal } from '../../types';
import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/ui/Card';
import { Progress } from '@/core/components/ui/Progress';
import { Button } from '@/core/components/ui/Button';

interface ReadingGoalProgressProps {
  goal: ReadingGoal | null;
  onSetGoal: () => void;
}

export const ReadingGoalProgress = ({ goal, onSetGoal }: ReadingGoalProgressProps) => {
  const progress = goal ? (goal.books_read_count / goal.book_count_goal) * 100 : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Annual Reading Goal</CardTitle>
      </CardHeader>
      <CardContent>
        {goal ? (
          <div className="space-y-2">
            <p>
              {goal.books_read_count} of {goal.book_count_goal} books read.
            </p>
            <Progress value={progress} />
            <Button variant="outline" size="sm" onClick={onSetGoal} className="mt-2">
              Edit Goal
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <p>You haven't set a reading goal for this year.</p>
            <Button onClick={onSetGoal} className="mt-4">
              Set a Goal
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
