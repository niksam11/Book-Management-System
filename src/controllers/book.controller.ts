import { Request, Response, NextFunction } from 'express';
import { bookService } from '../services/book.service';
import { AppError } from '../middlewares/errorHandler';

export class BookController {
    getAllBooks = (req: Request, res: Response, next: NextFunction) => {
        try {
            const books = bookService.findAll();
            res.status(200).json(books);
        } catch (error) {
            next(error);
        }
    };

    getBookById = (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params as { id: string };
            const book = bookService.findById(id);
            if (!book) {
                const error = new Error('Book not found') as AppError;
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json(book);
        } catch (error) {
            next(error);
        }
    };

    createBook = (req: Request, res: Response, next: NextFunction) => {
        try {
            const { title, author, publishedYear } = req.body;

            if (!title || !author || !publishedYear) {
                const error = new Error('Missing required fields: title, author, publishedYear') as AppError;
                error.statusCode = 400;
                throw error;
            }

            const newBook = bookService.create({ title, author, publishedYear });
            res.status(201).json(newBook);
        } catch (error) {
            next(error);
        }
    };

    updateBook = (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params as { id: string };
            const updatedBook = bookService.update(id, req.body);

            if (!updatedBook) {
                const error = new Error('Book not found') as AppError;
                error.statusCode = 404;
                throw error;
            }

            res.status(200).json(updatedBook);
        } catch (error) {
            next(error);
        }
    };

    deleteBook = (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params as { id: string };
            const success = bookService.delete(id);

            if (!success) {
                const error = new Error('Book not found') as AppError;
                error.statusCode = 404;
                throw error;
            }

            res.status(204).send();
        } catch (error) {
            next(error);
        }
    };

    importBooks = (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.file) {
                const error = new Error('No file uploaded') as AppError;
                error.statusCode = 400;
                throw error;
            }

            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const { parseAndValidateCSV } = require('../utils/csvParser');
            const { success, errors } = parseAndValidateCSV(req.file.buffer);

            const count = bookService.bulkImport(success);

            res.status(201).json({
                message: 'File processed',
                importedCount: count,
                errors: errors
            });
        } catch (error) {
            next(error);
        }
    };
}

export const bookController = new BookController();
