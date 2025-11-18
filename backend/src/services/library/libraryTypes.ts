export enum ShelfStatus {
  WantToRead = 0,
  Reading = 1,
  Read = 2,
}

export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string | null;
  publisher: string | null;
  publication_year: number | null;
  page_count: number;
  genre: string | null;
  cover_image_url: string | null;
}

export interface UserLibraryBook extends Book {
  libraryBookId: number;
  shelf_status: ShelfStatus;
  rating: number | null;
  review: string | null;
  date_added: string;
  date_started: string | null;
  date_finished: string | null;
  current_page: number;
}

// API Input Types
export interface AddBookBody {
  title: string;
  author: string;
  page_count: number;
  isbn?: string;
  publisher?: string;
  publication_year?: number;
  genre?: string;
  cover_image_url?: string;
}

export interface AddBookParams extends AddBookBody {
  userId: number;
}

export interface ListBooksQuery {
  shelf_status?: ShelfStatus;
}

export interface ListBooksParams {
  userId: number;
  shelfStatus?: ShelfStatus;
}

export interface UpdateBookBody {
  shelf_status?: ShelfStatus;
  rating?: number;
  review?: string;
  current_page?: number;
}

export interface UpdateBookParams extends UpdateBookBody {
  userId: number;
  libraryBookId: number;
}

export interface RemoveBookParams {
  userId: number;
  libraryBookId: number;
}
