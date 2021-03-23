import 'reflect-metadata';
import { autoInjectable, scoped, Lifecycle } from 'tsyringe';
import { DEFAULT_LIMIT_RESPONSE_SIZE, DEFAULT_PAGE_SKIP } from '../constants';
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

    getAll = async (limit: number, page: number): Promise<any> => {
        try {
            let offset
            if (!limit) {
                limit = DEFAULT_LIMIT_RESPONSE_SIZE
            }
            if (!page) {
                page = DEFAULT_PAGE_SKIP
            }


            offset = DEFAULT_LIMIT_RESPONSE_SIZE * (page - 1)


            const result = await this.repository.find({ limit, offset })
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

