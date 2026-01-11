"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookController = exports.BookController = void 0;
const book_service_1 = require("../services/book.service");
class BookController {
    constructor() {
        this.getAllBooks = (req, res, next) => {
            try {
                const books = book_service_1.bookService.findAll();
                res.status(200).json(books);
            }
            catch (error) {
                next(error);
            }
        };
        this.getBookById = (req, res, next) => {
            try {
                const { id } = req.params;
                const book = book_service_1.bookService.findById(id);
                if (!book) {
                    const error = new Error('Book not found');
                    error.statusCode = 404;
                    throw error;
                }
                res.status(200).json(book);
            }
            catch (error) {
                next(error);
            }
        };
        this.createBook = (req, res, next) => {
            try {
                const { title, author, publishedYear } = req.body;
                if (!title || !author || !publishedYear) {
                    const error = new Error('Missing required fields: title, author, publishedYear');
                    error.statusCode = 400;
                    throw error;
                }
                const newBook = book_service_1.bookService.create({ title, author, publishedYear });
                res.status(201).json(newBook);
            }
            catch (error) {
                next(error);
            }
        };
        this.updateBook = (req, res, next) => {
            try {
                const { id } = req.params;
                const updatedBook = book_service_1.bookService.update(id, req.body);
                if (!updatedBook) {
                    const error = new Error('Book not found');
                    error.statusCode = 404;
                    throw error;
                }
                res.status(200).json(updatedBook);
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteBook = (req, res, next) => {
            try {
                const { id } = req.params;
                const success = book_service_1.bookService.delete(id);
                if (!success) {
                    const error = new Error('Book not found');
                    error.statusCode = 404;
                    throw error;
                }
                res.status(204).send();
            }
            catch (error) {
                next(error);
            }
        };
        this.importBooks = (req, res, next) => {
            try {
                if (!req.file) {
                    const error = new Error('No file uploaded');
                    error.statusCode = 400;
                    throw error;
                }
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                const { parseAndValidateCSV } = require('../utils/csvParser');
                const { success, errors } = parseAndValidateCSV(req.file.buffer);
                const count = book_service_1.bookService.bulkImport(success);
                res.status(201).json({
                    message: 'File processed',
                    importedCount: count,
                    errors: errors
                });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.BookController = BookController;
exports.bookController = new BookController();
