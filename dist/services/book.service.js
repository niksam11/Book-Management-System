"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookService = exports.BookService = void 0;
const uuid_1 = require("uuid");
class BookService {
    constructor() {
        this.books = [];
    }
    findAll() {
        return this.books;
    }
    findById(id) {
        return this.books.find((book) => book.id === id);
    }
    create(data) {
        const newBook = {
            id: (0, uuid_1.v4)(),
            ...data,
        };
        this.books.push(newBook);
        return newBook;
    }
    update(id, data) {
        const index = this.books.findIndex((book) => book.id === id);
        if (index === -1)
            return undefined;
        this.books[index] = { ...this.books[index], ...data };
        return this.books[index];
    }
    delete(id) {
        const initialLength = this.books.length;
        this.books = this.books.filter((book) => book.id !== id);
        return this.books.length !== initialLength;
    }
    bulkImport(newBooks) {
        let count = 0;
        newBooks.forEach(bookData => {
            this.create(bookData);
            count++;
        });
        return count;
    }
}
exports.BookService = BookService;
exports.bookService = new BookService();
