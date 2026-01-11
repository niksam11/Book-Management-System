import express from 'express';
import { loggerMiddleware } from './middlewares/logger';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);

import bookRoutes from './routes/book.routes';

// Routes
app.use('/books', bookRoutes);
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date() });
});

// Error Handling (Must be last)
app.use(errorHandler);

export default app;
