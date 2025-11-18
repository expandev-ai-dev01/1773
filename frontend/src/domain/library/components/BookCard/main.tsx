import { LibraryBook } from '../../types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/core/components/ui/Card';
import { Button } from '@/core/components/ui/Button';
import { Progress } from '@/core/components/ui/Progress';

interface BookCardProps {
  libraryBook: LibraryBook;
}

export const BookCard = ({ libraryBook }: BookCardProps) => {
  const { book, progress_percentage } = libraryBook;

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <img
          src={book.cover_image_url || 'https://via.placeholder.com/150x220'}
          alt={`Cover of ${book.title}`}
          className="rounded-md w-full h-48 object-cover"
        />
        <CardTitle className="mt-2 text-lg truncate">{book.title}</CardTitle>
        <p className="text-sm text-gray-500 truncate">{book.author}</p>
      </CardHeader>
      <CardContent className="flex-grow">
        {progress_percentage !== undefined && progress_percentage !== null && (
          <div>
            <Progress value={progress_percentage} className="h-2" />
            <p className="text-xs text-center mt-1">{progress_percentage}% complete</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};
