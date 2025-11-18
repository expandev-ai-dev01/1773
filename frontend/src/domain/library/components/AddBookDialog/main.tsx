import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLibrary } from '../../hooks/useLibrary';
import { Button } from '@/core/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/core/components/ui/Dialog';
import { Input } from '@/core/components/ui/Input';
import { Label } from '@/core/components/ui/Label';
import { useState } from 'react';

const addBookSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  page_count: z.coerce.number().positive('Page count must be a positive number'),
  cover_image_url: z.string().url().optional().or(z.literal('')),
  publication_year: z.coerce.number().optional(),
  genre: z.string().optional(),
});

type AddBookFormData = z.infer<typeof addBookSchema>;

export const AddBookDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { addBook, isAddingBook } = useLibrary();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddBookFormData>({
    resolver: zodResolver(addBookSchema),
  });

  const onSubmit = async (data: AddBookFormData) => {
    try {
      await addBook(data);
      reset();
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to add book:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Add New Book</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new book</DialogTitle>
          <DialogDescription>Manually enter the details of your new book.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input id="title" {...register('title')} className="col-span-3" />
            {errors.title && (
              <p className="col-span-4 text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="author" className="text-right">
              Author
            </Label>
            <Input id="author" {...register('author')} className="col-span-3" />
            {errors.author && (
              <p className="col-span-4 text-red-500 text-sm">{errors.author.message}</p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="page_count" className="text-right">
              Pages
            </Label>
            <Input
              id="page_count"
              type="number"
              {...register('page_count')}
              className="col-span-3"
            />
            {errors.page_count && (
              <p className="col-span-4 text-red-500 text-sm">{errors.page_count.message}</p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cover_image_url" className="text-right">
              Cover URL
            </Label>
            <Input id="cover_image_url" {...register('cover_image_url')} className="col-span-3" />
            {errors.cover_image_url && (
              <p className="col-span-4 text-red-500 text-sm">{errors.cover_image_url.message}</p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isAddingBook}>
              {isAddingBook ? 'Adding...' : 'Add Book'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
