import multer from 'multer';

// Use memory storage to process file buffer directly
const storage = multer.memoryStorage();

export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});
