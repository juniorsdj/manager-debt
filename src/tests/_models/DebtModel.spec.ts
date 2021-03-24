import { DebtModel } from '../../models';

describe('DebtModel', () => {
    it('should create a instance', () => {
        const userId = '100'
        const debtDate = new Date("2021-03-23")
        const value = 100
        const reason = "Motivo da dívida"

        const base = new DebtModel(userId, reason, debtDate, value);

        expect(typeof base).toBe("object")

    });
    it('should create a object type IDebt with success', () => {
        const userId = '100'
        const debtDate = new Date("2021-03-23")
        const value = 100
        const reason = "Motivo da dívida"

        const base = DebtModel.create(userId, reason, debtDate, value);

        expect(typeof base).toBe("object")

    });
    it('should create a object type IDebt with error', () => {
        const userId = '100'
        const debtDate = new Date("2021-03-23")
        const value = -1
        const reason = "Motivo da dívida"

        const base = DebtModel.create(userId, reason, debtDate, value);

        expect(typeof base).toBe("string")

    });

});
