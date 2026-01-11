"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../src/app"));
describe('App Import', () => {
    it('should import app successfully', () => {
        expect(app_1.default).toBeDefined();
    });
});
