"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const book_service_1 = require("../src/services/book.service");
describe('Service Import', () => {
    it('should import service successfully', () => {
        expect(book_service_1.bookService).toBeDefined();
    });
});
