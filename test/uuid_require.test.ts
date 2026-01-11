describe('UUID Require', () => {
    it('should require uuid successfully', () => {
        const { v4 } = require('uuid');
        expect(v4).toBeDefined();
        console.log(v4());
    });
});
