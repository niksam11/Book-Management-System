"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
describe('UUID Import', () => {
    it('should import uuid successfully', () => {
        expect(uuid_1.v4).toBeDefined();
        console.log((0, uuid_1.v4)());
    });
});
