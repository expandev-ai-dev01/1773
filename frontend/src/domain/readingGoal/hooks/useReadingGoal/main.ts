import { useMutation, useQueryClient } from '@tanstack/react-query';
import { readingGoalService } from '../../services/readingGoalService';
import { SetReadingGoalDto } from '../../types';

export const useReadingGoal = () => {
  const queryClient = useQueryClient();

  const setGoalMutation = useMutation({
    mutationFn: (goalData: SetReadingGoalDto) => readingGoalService.setAnnualReadingGoal(goalData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  return {
    setAnnualReadingGoal: setGoalMutation.mutateAsync,
    isSettingGoal: setGoalMutation.isPending,
  };
};
