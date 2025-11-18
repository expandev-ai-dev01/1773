export type ShelfStatus = 'Quero Ler' | 'Lendo' | 'Lido';

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn?: string;
  publisher?: string;
  publication_year?: number;
  page_count: number;
  genre?: string;
  cover_image_url?: string;
}

export interface LibraryBook {
  id: number; // This is the library entry ID
  book: Book;
  shelf_status: ShelfStatus;
  rating?: number;
  review_text?: string;
  progress_percentage?: number;
  started_reading_at?: string;
  finished_reading_at?: string;
}

export type AddBookDto = Omit<Book, 'id'>;

export interface UpdateBookDto {
  shelf_status?: ShelfStatus;
  rating?: number;
  review_text?: string;
  progress_update_page?: number;
}
