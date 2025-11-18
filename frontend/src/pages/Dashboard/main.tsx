import { useState } from 'react';
import { useDashboard } from '@/domain/dashboard/hooks/useDashboard';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { ReadingGoalProgress } from '@/domain/dashboard/components/ReadingGoalProgress';
import { CurrentlyReading } from '@/domain/dashboard/components/CurrentlyReading';
import { SetReadingGoalDialog } from '@/domain/readingGoal/components/SetReadingGoalDialog';

const DashboardPage = () => {
  const { data, isLoading, error } = useDashboard();
  const [isGoalDialogOpen, setIsGoalDialogOpen] = useState(false);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-red-500">Error loading dashboard: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <ReadingGoalProgress
        goal={data?.readingGoal || null}
        onSetGoal={() => setIsGoalDialogOpen(true)}
      />

      <CurrentlyReading books={data?.currentlyReading || []} />

      {/* Placeholder for stats */}
      <div>
        <h2 className="text-2xl font-semibold">Reading Stats</h2>
        <p>Charts and stats will be displayed here.</p>
      </div>

      <SetReadingGoalDialog
        isOpen={isGoalDialogOpen}
        onOpenChange={setIsGoalDialogOpen}
        currentGoal={data?.readingGoal?.book_count_goal}
      />
    </div>
  );
};

export default DashboardPage;
