import { useLibrary } from '@/domain/library/hooks/useLibrary';
import { BookCard } from '@/domain/library/components/BookCard';
import { AddBookDialog } from '@/domain/library/components/AddBookDialog';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/core/components/ui/Tabs';
import { ShelfStatus } from '@/domain/library/types';

const LibraryShelf = ({ shelfStatus }: { shelfStatus: ShelfStatus }) => {
  const { books, isLoading, error } = useLibrary(shelfStatus);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">Error loading books: {error.message}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {books && books.length > 0 ? (
        books.map((libraryBook) => <BookCard key={libraryBook.id} libraryBook={libraryBook} />)
      ) : (
        <p>No books on this shelf.</p>
      )}
    </div>
  );
};

const LibraryPage = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Library</h1>
        <AddBookDialog />
      </div>

      <Tabs defaultValue="Lendo">
        <TabsList>
          <TabsTrigger value="Lendo">Reading</TabsTrigger>
          <TabsTrigger value="Quero Ler">Want to Read</TabsTrigger>
          <TabsTrigger value="Lido">Read</TabsTrigger>
        </TabsList>
        <TabsContent value="Lendo">
          <LibraryShelf shelfStatus="Lendo" />
        </TabsContent>
        <TabsContent value="Quero Ler">
          <LibraryShelf shelfStatus="Quero Ler" />
        </TabsContent>
        <TabsContent value="Lido">
          <LibraryShelf shelfStatus="Lido" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LibraryPage;
