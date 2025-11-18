import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '@/middleware/auth';
import * as libraryRules from '@/services/library/libraryRules';
import { AddBookBody, ListBooksQuery, UpdateBookBody } from '@/services/library/libraryTypes';

export const addBookToLibrary = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.id;
    const bookData = req.body as AddBookBody;
    const newLibraryEntry = await libraryRules.addBookToLibrary({ userId, ...bookData });
    res.status(201).json({ success: true, data: newLibraryEntry });
  } catch (error) {
    next(error);
  }
};

export const listLibraryBooks = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.id;
    const { shelf_status } = req.query as unknown as ListBooksQuery;
    const books = await libraryRules.listLibraryBooks({ userId, shelfStatus: shelf_status });
    res.status(200).json({ success: true, data: books });
  } catch (error) {
    next(error);
  }
};

export const updateLibraryBook = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.id;
    const { libraryBookId } = req.params as { libraryBookId: string };
    const updateData = req.body as UpdateBookBody;
    const updatedBook = await libraryRules.updateLibraryBook({
      userId,
      libraryBookId: parseInt(libraryBookId, 10),
      ...updateData,
    });
    res.status(200).json({ success: true, data: updatedBook });
  } catch (error) {
    next(error);
  }
};

export const removeBookFromLibrary = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.id;
    const { libraryBookId } = req.params as { libraryBookId: string };
    await libraryRules.removeBookFromLibrary({
      userId,
      libraryBookId: parseInt(libraryBookId, 10),
    });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
