"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
describe('Combo Import', () => {
    it('should work with both imports', () => {
        expect(app_1.default).toBeDefined();
        expect(supertest_1.default).toBeDefined();
    });
});
