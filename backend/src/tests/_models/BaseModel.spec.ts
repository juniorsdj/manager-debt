import BaseModel from './../../models/BaseModel';

describe('BaseModel', () => {
    it('should create a instance', () => {
        const base = new BaseModel();

        expect(base).toBeTruthy();

        const { createdAt, updatedAt } = base;

        expect(createdAt).toBeTruthy();
        expect(updatedAt).toBeTruthy();
    });

    it('should handle exception', () => {
        const handle = new BaseModel().handleException(new Error('error'));

        expect(handle).toBe(false);
    });
});
