"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = void 0;
const morgan_1 = __importDefault(require("morgan"));
const stream = {
    write: (message) => {
        // In a real app, you might check env and pipe to winston/pino
        console.log(message.trim());
    },
};
const skip = () => {
    const env = process.env.NODE_ENV || 'development';
    return env !== 'development';
};
exports.loggerMiddleware = (0, morgan_1.default)(':method :url :status :res[content-length] - :response-time ms', { stream, skip });
