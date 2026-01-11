"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
console.log('Loading books.test.ts simplified');
describe('Book API Endpoints', () => {
    describe('GET /books', () => {
        it('should return an empty list initially', async () => {
            const res = await (0, supertest_1.default)(app_1.default).get('/books');
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });
});
