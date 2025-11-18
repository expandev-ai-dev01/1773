import { authenticatedClient } from '@/core/lib/api';
import { AddBookDto, LibraryBook, ShelfStatus, UpdateBookDto } from '../types';

/**
 * @service libraryService
 * @summary Service for managing user's library.
 * @domain library
 * @type api-service
 */
export const libraryService = {
  /**
   * @endpoint GET /library/books
   * @summary Fetches books from the user's library, optionally filtered by shelf.
   */
  async listBooks(shelfStatus?: ShelfStatus): Promise<LibraryBook[]> {
    const response = await authenticatedClient.get<{ data: LibraryBook[] }>('/library/books', {
      params: { shelf_status: shelfStatus },
    });
    return response.data.data;
  },

  /**
   * @endpoint POST /library/book
   * @summary Adds a new book to the user's library.
   */
  async addBook(bookData: AddBookDto): Promise<LibraryBook> {
    const response = await authenticatedClient.post<{ data: LibraryBook }>(
      '/library/book',
      bookData
    );
    return response.data.data;
  },

  /**
   * @endpoint PUT /library/book/:libraryBookId
   * @summary Updates a book in the user's library.
   */
  async updateBook(libraryBookId: number, updateData: UpdateBookDto): Promise<LibraryBook> {
    const response = await authenticatedClient.put<{ data: LibraryBook }>(
      `/library/book/${libraryBookId}`,
      updateData
    );
    return response.data.data;
  },

  /**
   * @endpoint DELETE /library/book/:libraryBookId
   * @summary Removes a book from the user's library.
   */
  async removeBook(libraryBookId: number): Promise<void> {
    await authenticatedClient.delete(`/library/book/${libraryBookId}`);
  },
};
