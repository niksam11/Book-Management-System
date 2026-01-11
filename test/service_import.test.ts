import { bookService } from '../src/services/book.service';

describe('Service Import', () => {
    it('should import service successfully', () => {
        expect(bookService).toBeDefined();
    });
});
