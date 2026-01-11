import { v4 as uuidv4 } from 'uuid';

describe('UUID Import', () => {
    it('should import uuid successfully', () => {
        expect(uuidv4).toBeDefined();
        console.log(uuidv4());
    });
});
