import request from 'supertest';
import app from '../src/app';

describe('Combo Import', () => {
    it('should work with both imports', () => {
        expect(app).toBeDefined();
        expect(request).toBeDefined();
    });
});
