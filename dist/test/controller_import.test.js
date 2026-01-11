"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const book_controller_1 = require("../src/controllers/book.controller");
describe('Controller Import', () => {
    it('should import controller successfully', () => {
        expect(book_controller_1.bookController).toBeDefined();
    });
});
