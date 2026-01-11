import morgan from 'morgan';
import { Request, Response } from 'express';

const stream = {
    write: (message: string) => {
        // In a real app, you might check env and pipe to winston/pino
        console.log(message.trim());
    },
};

const skip = () => {
    const env = process.env.NODE_ENV || 'development';
    return env !== 'development';
};

export const loggerMiddleware = morgan(
    ':method :url :status :res[content-length] - :response-time ms',
    { stream, skip }
);
