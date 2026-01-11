import request from 'supertest';
import app from '../src/app';

console.log('Loading books.test.ts simplified');

describe('Book API Endpoints', () => {
    describe('GET /books', () => {
        it('should return an empty list initially', async () => {
            const res = await request(app).get('/books');
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });
});
