import 'reflect-metadata';
import { autoInjectable, scoped, Lifecycle } from 'tsyringe';
import { DEBTS_SORT_VALUES, DEFAULT_LIMIT_RESPONSE_SIZE, DEFAULT_PAGE_SKIP } from '../constants';
import { DebtModel } from '../models';
import { DebtRepository } from '../repository';
import pjson from './../../package.json';

import BaseCommand from './BaseCommand';

@autoInjectable()
@scoped(Lifecycle.ContainerScoped)
export class DebtCommand extends BaseCommand {
    constructor(private repository: DebtRepository) {
        super();
    }

    getAll = async (userId: string, limit: number, page: number, order: string): Promise<any> => {
        try {
            let offset
            let sort
            let project
            if (!limit) {
                limit = DEFAULT_LIMIT_RESPONSE_SIZE
            }
            if (!page) {
                page = DEFAULT_PAGE_SKIP
            }


            offset = DEFAULT_LIMIT_RESPONSE_SIZE * (page - 1)




            switch (order) {
                case DEBTS_SORT_VALUES.DEBT_DATE_ASC:
                    sort = {
                        debtDate: 1
                    }
                    break
                case DEBTS_SORT_VALUES.DEBT_DATE_DESC:
                    sort = {
                        debtDate: -1
                    }
                    break
                case DEBTS_SORT_VALUES.VALUE_ASC:
                    sort = {
                        value: 1
                    }
                    break
                case DEBTS_SORT_VALUES.VALUE_DESC:
                    sort = {
                        value: -1
                    }
                    break
                default:
            }

            const result = await this.repository.find({ limit, offset, userId }, project, sort)
            return result
        } catch (ex) {
            return this.handleException(ex);
        }
    }
    createDebt = async (userId: string, reason: string, debtDate: Date, value: number): Promise<any> => {
        try {

            const dbt = DebtModel.create(userId, reason, debtDate, value)

            if (typeof dbt === "string") {
                return this.addError(dbt)
            }
            const isInserted = await this.repository.create(dbt)
            if (!isInserted) {
                return this.addError("Fail on inserted on database")
            }

            return isInserted;
        } catch (ex) {
            return this.handleException(ex);
        }
    }

}

