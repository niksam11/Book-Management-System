import { Book } from '../interfaces/book.interface';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { v4: uuidv4 } = require('uuid');

export class BookService {
    private books: Book[] = [];

    findAll(): Book[] {
        return this.books;
    }

    findById(id: string): Book | undefined {
        return this.books.find((book) => book.id === id);
    }

    create(data: Omit<Book, 'id'>): Book {
        const newBook: Book = {
            id: uuidv4(),
            ...data,
        };
        this.books.push(newBook);
        return newBook;
    }

    update(id: string, data: Partial<Omit<Book, 'id'>>): Book | undefined {
        const index = this.books.findIndex((book) => book.id === id);
        if (index === -1) return undefined;

        this.books[index] = { ...this.books[index], ...data };
        return this.books[index];
    }

    delete(id: string): boolean {
        const initialLength = this.books.length;
        this.books = this.books.filter((book) => book.id !== id);
        return this.books.length !== initialLength;
    }

    bulkImport(newBooks: Omit<Book, 'id'>[]): number {
        let count = 0;
        newBooks.forEach(bookData => {
            this.create(bookData);
            count++;
        });
        return count;
    }
}

export const bookService = new BookService();
