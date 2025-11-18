import { getPool } from '@/utils/database';
import sql from 'mssql';
import { HttpException } from '@/utils/httpException';
import {
  AddBookParams,
  ListBooksParams,
  RemoveBookParams,
  UpdateBookParams,
  UserLibraryBook,
} from './libraryTypes';

export const addBookToLibrary = async (params: AddBookParams): Promise<UserLibraryBook> => {
  const pool = await getPool();
  const result = await pool
    .request()
    .input('userId', sql.Int, params.userId)
    .input('title', sql.NVarChar(255), params.title)
    .input('author', sql.NVarChar(255), params.author)
    .input('page_count', sql.Int, params.page_count)
    .input('isbn', sql.VarChar(20), params.isbn)
    .input('publisher', sql.NVarChar(100), params.publisher)
    .input('publication_year', sql.Int, params.publication_year)
    .input('genre', sql.NVarChar(100), params.genre)
    .input('cover_image_url', sql.NVarChar(500), params.cover_image_url)
    .execute('dbo.sp_AddBookToLibrary');

  if (result.returnValue === -1) {
    throw new HttpException(409, 'This book is already in your library.');
  }

  return result.recordset[0];
};

export const listLibraryBooks = async (params: ListBooksParams): Promise<UserLibraryBook[]> => {
  const pool = await getPool();
  const result = await pool
    .request()
    .input('userId', sql.Int, params.userId)
    .input('shelfStatus', sql.TinyInt, params.shelfStatus)
    .execute('dbo.sp_ListLibraryBooks');

  return result.recordset;
};

export const updateLibraryBook = async (params: UpdateBookParams): Promise<UserLibraryBook> => {
  const pool = await getPool();
  const result = await pool
    .request()
    .input('userId', sql.Int, params.userId)
    .input('libraryBookId', sql.Int, params.libraryBookId)
    .input('shelf_status', sql.TinyInt, params.shelf_status)
    .input('rating', sql.Decimal(3, 1), params.rating)
    .input('review', sql.NVarChar(sql.MAX), params.review)
    .input('current_page', sql.Int, params.current_page)
    .execute('dbo.sp_UpdateLibraryBook');

  if (result.returnValue === -1) {
    throw new HttpException(404, 'Book not found in your library.');
  }
  if (result.returnValue === -2) {
    throw new HttpException(
      400,
      'Invalid page number. It must be between 0 and the total page count.'
    );
  }

  return result.recordset[0];
};

export const removeBookFromLibrary = async (params: RemoveBookParams): Promise<void> => {
  const pool = await getPool();
  const result = await pool
    .request()
    .input('userId', sql.Int, params.userId)
    .input('libraryBookId', sql.Int, params.libraryBookId)
    .execute('dbo.sp_RemoveBookFromLibrary');

  if (result.returnValue === -1) {
    throw new HttpException(404, 'Book not found in your library.');
  }
};
