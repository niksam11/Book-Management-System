import { upload } from '../src/middlewares/upload';

describe('Upload Import', () => {
    it('should import upload middleware successfully', () => {
        expect(upload).toBeDefined();
    });
});
