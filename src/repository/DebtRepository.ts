/* eslint-disable prettier/prettier */
import { injectable, inject, singleton } from 'tsyringe';
import { Collection, ObjectId } from 'mongodb';
import { IDebt, ResultPaginado } from './../types';
import { isEmpty } from 'lodash'
@singleton()
@injectable()
export class DebtRepository {
    constructor(
        @inject('IDebtCollection') private collection: Collection<IDebt>,
    ) { }


    async create(debt: Omit<IDebt, '_id'>): Promise<IDebt | false> {
        if (isEmpty(debt)) {
            throw new Error('Debt empty');
        }

        const result = await this.collection.insertOne(debt);

        return result.result.ok ? result.ops[0] : false;
    }

    async update(debtId: ObjectId, payload: Partial<IDebt>): Promise<boolean> {
        if (isEmpty(payload)) {
            throw new Error('payload debt empty');
        }
        const result = await this.collection.updateOne({ _id: debtId }, { $set: payload });

        return result.result.ok > 0;
    }
    async delete(debtId: ObjectId): Promise<boolean> {
        if (!debtId) {
            throw new Error('debtId not found');
        }
        const result = await this.collection.deleteOne({ _id: debtId });

        return result.deletedCount === 1
    }


    async find(
        mongoFilters?: any,
    ): Promise<IDebt[]> {

        const data: IDebt[] = await this.collection
            .find(mongoFilters)
            .toArray();


        return data
    }
}