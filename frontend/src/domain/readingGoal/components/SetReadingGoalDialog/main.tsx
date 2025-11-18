import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useReadingGoal } from '../../hooks/useReadingGoal';
import { Button } from '@/core/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/core/components/ui/Dialog';
import { Input } from '@/core/components/ui/Input';
import { Label } from '@/core/components/ui/Label';

const setGoalSchema = z.object({
  book_count_goal: z.coerce.number().positive('Goal must be a positive number'),
});

type SetGoalFormData = z.infer<typeof setGoalSchema>;

interface SetReadingGoalDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentGoal?: number;
}

export const SetReadingGoalDialog = ({
  isOpen,
  onOpenChange,
  currentGoal,
}: SetReadingGoalDialogProps) => {
  const { setAnnualReadingGoal, isSettingGoal } = useReadingGoal();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SetGoalFormData>({
    resolver: zodResolver(setGoalSchema),
    defaultValues: {
      book_count_goal: currentGoal || 0,
    },
  });

  const onSubmit = async (data: SetGoalFormData) => {
    try {
      await setAnnualReadingGoal({ ...data, year: new Date().getFullYear() });
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to set goal:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Set Annual Reading Goal</DialogTitle>
          <DialogDescription>How many books do you want to read this year?</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="book_count_goal" className="text-right">
              Books
            </Label>
            <Input
              id="book_count_goal"
              type="number"
              {...register('book_count_goal')}
              className="col-span-3"
            />
            {errors.book_count_goal && (
              <p className="col-span-4 text-red-500 text-sm">{errors.book_count_goal.message}</p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSettingGoal}>
              {isSettingGoal ? 'Saving...' : 'Set Goal'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
