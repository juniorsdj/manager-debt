import { ObjectId } from "bson";
import { removeNil } from "../helpers";
import { IDebt } from "../types";
import BaseModel from "./BaseModel";

export class DebtModel extends BaseModel implements IDebt {
    constructor(
        public userId: string,
        public reason: string,
        public debtDate: Date,
        public value: number,

    ) {
        super()
    }

    static create(userId: string,
        reason: string,
        debtDate: Date,
        value: number): IDebt | string {
        const dbt = new DebtModel(userId, reason, debtDate, value)

        if (value < 0) {
            return "Valor do débito deve ser maior que 0"
        }
        return dbt.toIDebt()
    }


    toIDebt(
        removeAllNil = true,
    ): IDebt {
        return !removeAllNil ? (this as IDebt) : removeNil(this);
    }

}

