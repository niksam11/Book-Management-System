"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const upload_1 = require("../src/middlewares/upload");
describe('Upload Import', () => {
    it('should import upload middleware successfully', () => {
        expect(upload_1.upload).toBeDefined();
    });
});
