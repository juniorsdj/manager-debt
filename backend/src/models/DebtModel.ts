import { ObjectId } from "bson";
import { removeNil } from "../helpers";
import { IDebt } from "../types";
import BaseModel from "./BaseModel";

export class DebtModel extends BaseModel implements IDebt {
    constructor(
        public userId: string,
        public userName: string,
        public reason: string,
        public debtDate: Date,
        public value: number,

    ) {
        super()
    }

    static create(userId: string,
        userName: string,
        reason: string,
        debtDate: Date,
        value: number): IDebt | string {
        const dbt = new DebtModel(userId,userName, reason, debtDate, value)
        if (value < 0) {
            return "Valor do débito deve ser maior que 0"
        }
        return dbt.toIDebt()
    }
    static update(_id: string,
        {
            reason,
            debtDate,
            value
        }: {
            reason?: string,
            debtDate?: Date,
            value?: number
        }): Partial<IDebt> | string {

        const dbt: Partial<IDebt> = {
            _id: new ObjectId(_id)
        };

        if (value) {
            if (value < 0) {
                return "Valor do débito deve ser maior que 0"
            }

            dbt.value = value
        }

        if (debtDate) {
            dbt.debtDate = new Date(debtDate)
        }
        if (reason) {
            dbt.reason = reason
        }

        return dbt
    }


    toIDebt(
        removeAllNil = true,
    ): IDebt {
        return !removeAllNil ? (this as IDebt) : removeNil(this);
    }

}

