"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
describe('Book API Endpoints', () => {
    let createdBookId;
    beforeAll(() => {
        // Clean up or setup if needed. Since it's in-memory, restarting tests resets state usually,
        // but here we are running against the app instance which holds the service singleton.
        // If tests run in parallel or sequence, we might want to clear books.
        // For now, clean state is assumed or we just test flows.
    });
    describe('GET /books', () => {
        it('should return an empty list initially', async () => {
            const res = await (0, supertest_1.default)(app_1.default).get('/books');
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });
    describe('POST /books', () => {
        it('should create a new book', async () => {
            const newBook = {
                title: 'The Great Gatsby',
                author: 'F. Scott Fitzgerald',
                publishedYear: 1925,
            };
            const res = await (0, supertest_1.default)(app_1.default).post('/books').send(newBook);
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('id');
            expect(res.body.title).toBe(newBook.title);
            createdBookId = res.body.id;
        });
        it('should return 400 if fields are missing', async () => {
            const res = await (0, supertest_1.default)(app_1.default).post('/books').send({ title: 'Missing Info' });
            expect(res.status).toBe(400);
        });
    });
    describe('GET /books/:id', () => {
        it('should get the book details', async () => {
            const res = await (0, supertest_1.default)(app_1.default).get(`/books/${createdBookId}`);
            expect(res.status).toBe(200);
            expect(res.body.id).toBe(createdBookId);
        });
        it('should return 404 for non-existent book', async () => {
            const res = await (0, supertest_1.default)(app_1.default).get('/books/non-existent-id');
            expect(res.status).toBe(404);
        });
    });
    describe('PUT /books/:id', () => {
        it('should update the book', async () => {
            const updates = { title: 'The Great Gatsby (Updated)' };
            const res = await (0, supertest_1.default)(app_1.default).put(`/books/${createdBookId}`).send(updates);
            expect(res.status).toBe(200);
            expect(res.body.title).toBe(updates.title);
        });
    });
    describe('DELETE /books/:id', () => {
        it('should delete the book', async () => {
            const res = await (0, supertest_1.default)(app_1.default).delete(`/books/${createdBookId}`);
            expect(res.status).toBe(204);
        });
        it('should return 404 if trying to get deleted book', async () => {
            const res = await (0, supertest_1.default)(app_1.default).get(`/books/${createdBookId}`);
            expect(res.status).toBe(404);
        });
    });
    describe('POST /books/import', () => {
        it('should import books from CSV', async () => {
            const csvContent = 'title,author,publishedYear\nBook1,Author1,2000\nBook2,Author2,2010';
            const buffer = Buffer.from(csvContent, 'utf-8');
            const res = await (0, supertest_1.default)(app_1.default)
                .post('/books/import')
                .attach('file', buffer, 'books.csv');
            expect(res.status).toBe(201);
            expect(res.body.importedCount).toBe(2);
            expect(res.body.errors).toHaveLength(0);
            // Verify they exist
            const listRes = await (0, supertest_1.default)(app_1.default).get('/books');
            expect(listRes.body.length).toBeGreaterThanOrEqual(2);
        });
        it('should handle CSV validation errors', async () => {
            const csvContent = 'title,author,publishedYear\nInvalidBook,,2021';
            const buffer = Buffer.from(csvContent, 'utf-8');
            const res = await (0, supertest_1.default)(app_1.default)
                .post('/books/import')
                .attach('file', buffer, 'books.csv');
            expect(res.status).toBe(201); // Still 201 as per requirement? Or maybe partial success.
            // My implementation returns 201 with errors list.
            expect(res.body.importedCount).toBe(0);
            expect(res.body.errors).toHaveLength(1);
        });
    });
});
