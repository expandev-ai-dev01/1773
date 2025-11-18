import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { libraryService } from '../../services/libraryService';
import { AddBookDto, ShelfStatus, UpdateBookDto } from '../../types';

export const useLibrary = (shelfStatus?: ShelfStatus) => {
  const queryClient = useQueryClient();
  const queryKey = ['libraryBooks', shelfStatus];

  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: () => libraryService.listBooks(shelfStatus),
  });

  const invalidateQueries = () => {
    queryClient.invalidateQueries({ queryKey: ['libraryBooks'] });
    queryClient.invalidateQueries({ queryKey: ['dashboard'] });
  };

  const addBookMutation = useMutation({
    mutationFn: (bookData: AddBookDto) => libraryService.addBook(bookData),
    onSuccess: invalidateQueries,
  });

  const updateBookMutation = useMutation({
    mutationFn: ({
      libraryBookId,
      updateData,
    }: {
      libraryBookId: number;
      updateData: UpdateBookDto;
    }) => libraryService.updateBook(libraryBookId, updateData),
    onSuccess: invalidateQueries,
  });

  const removeBookMutation = useMutation({
    mutationFn: (libraryBookId: number) => libraryService.removeBook(libraryBookId),
    onSuccess: invalidateQueries,
  });

  return {
    books: data,
    isLoading,
    error,
    addBook: addBookMutation.mutateAsync,
    isAddingBook: addBookMutation.isPending,
    updateBook: updateBookMutation.mutateAsync,
    isUpdatingBook: updateBookMutation.isPending,
    removeBook: removeBookMutation.mutateAsync,
    isRemovingBook: removeBookMutation.isPending,
  };
};
