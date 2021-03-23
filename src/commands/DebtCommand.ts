import 'reflect-metadata';
import { autoInjectable, scoped, Lifecycle } from 'tsyringe';
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

    getAll = async (): Promise<any> => {
        try {

            const about = {
                version: pjson.version
            }
            return about;
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

