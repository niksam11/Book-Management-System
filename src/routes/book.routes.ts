import { Router } from 'express';
import { bookController } from '../controllers/book.controller';

import { upload } from '../middlewares/upload';

const router = Router();

router.post('/import', upload.single('file'), bookController.importBooks);
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.post('/', bookController.createBook);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

export default router;
