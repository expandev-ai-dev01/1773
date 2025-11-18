import { Router } from 'express';
import * as libraryController from '@/api/v1/internal/library/controller';
import { authMiddleware } from '@/middleware/auth';
import { validationMiddleware } from '@/middleware/validation';
import {
  addBookSchema,
  listBooksSchema,
  removeBookSchema,
  updateBookSchema,
} from '@/services/library/libraryValidation';

const router = Router();

/**
 * @api {post} /library/book Add a book to the library
 * @apiName AddBook
 * @apiGroup Library
 * @apiVersion 1.0.0
 */
router.post(
  '/book',
  authMiddleware,
  validationMiddleware(addBookSchema),
  libraryController.addBookToLibrary
);

/**
 * @api {get} /library/books List books in the library
 * @apiName ListBooks
 * @apiGroup Library
 * @apiVersion 1.0.0
 */
router.get(
  '/books',
  authMiddleware,
  validationMiddleware(listBooksSchema),
  libraryController.listLibraryBooks
);

/**
 * @api {put} /library/book/:libraryBookId Update a book in the library
 * @apiName UpdateBook
 * @apiGroup Library
 * @apiVersion 1.0.0
 */
router.put(
  '/book/:libraryBookId',
  authMiddleware,
  validationMiddleware(updateBookSchema),
  libraryController.updateLibraryBook
);

/**
 * @api {delete} /library/book/:libraryBookId Remove a book from the library
 * @apiName RemoveBook
 * @apiGroup Library
 * @apiVersion 1.0.0
 */
router.delete(
  '/book/:libraryBookId',
  authMiddleware,
  validationMiddleware(removeBookSchema),
  libraryController.removeBookFromLibrary
);

export default router;
