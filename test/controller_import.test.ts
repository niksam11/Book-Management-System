import { bookController } from '../src/controllers/book.controller';

describe('Controller Import', () => {
    it('should import controller successfully', () => {
        expect(bookController).toBeDefined();
    });
});
