import request from 'supertest';

describe('Supertest Import', () => {
    it('should import supertest successfully', () => {
        expect(request).toBeDefined();
    });
});
