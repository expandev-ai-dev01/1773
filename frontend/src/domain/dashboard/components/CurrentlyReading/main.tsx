import { BookCard } from '@/domain/library/components/BookCard';
import { LibraryBook } from '@/domain/library/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/ui/Card';

interface CurrentlyReadingProps {
  books: LibraryBook[];
}

export const CurrentlyReading = ({ books }: CurrentlyReadingProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Currently Reading</CardTitle>
      </CardHeader>
      <CardContent>
        {books.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {books.map((book) => (
              <BookCard key={book.id} libraryBook={book} />
            ))}
          </div>
        ) : (
          <p>You are not reading any books at the moment.</p>
        )}
      </CardContent>
    </Card>
  );
};
