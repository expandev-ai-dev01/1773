import { z } from 'zod';
import { ShelfStatus } from './libraryTypes';

export const addBookSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required').max(255),
    author: z.string().min(1, 'Author is required').max(255),
    page_count: z.number().int().positive('Page count must be a positive number'),
    isbn: z.string().max(20).optional(),
    publisher: z.string().max(100).optional(),
    publication_year: z.number().int().optional(),
    genre: z.string().max(100).optional(),
    cover_image_url: z.string().url().max(500).optional(),
  }),
});

export const listBooksSchema = z.object({
  query: z.object({
    shelf_status: z.coerce
      .number()
      .int()
      .refine((val) => Object.values(ShelfStatus).includes(val), {
        message: 'Invalid shelf status',
      })
      .optional(),
  }),
});

export const updateBookSchema = z.object({
  params: z.object({
    libraryBookId: z.string().regex(/^\d+$/, 'Library Book ID must be a number'),
  }),
  body: z
    .object({
      shelf_status: z.nativeEnum(ShelfStatus).optional(),
      rating: z.number().min(1).max(5).optional(),
      review: z.string().max(5000).optional(),
      current_page: z.number().int().min(0).optional(),
    })
    .strip(), // Use strip to prevent unknown fields
});

export const removeBookSchema = z.object({
  params: z.object({
    libraryBookId: z.string().regex(/^\d+$/, 'Library Book ID must be a number'),
  }),
});
