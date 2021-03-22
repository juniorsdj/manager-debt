import { ObjectId } from 'mongodb';

export interface IDebt {

    _id: ObjectId,
    userId: string,
    reason: string,
    debtDate: Date,
    value: number
}