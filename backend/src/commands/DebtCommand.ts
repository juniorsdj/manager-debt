import { ObjectId } from 'bson';
import 'reflect-metadata';
import { autoInjectable, scoped, Lifecycle } from 'tsyringe';
import { DEBTS_SORT_VALUES, DEFAULT_LIMIT_RESPONSE_SIZE, DEFAULT_PAGE_SKIP } from '../constants';
import { DebtModel } from '../models';
import { DebtRepository } from '../repository';
import { JsonPlaceholderService } from '../services';
import pjson from './../../package.json';

import BaseCommand from './BaseCommand';

@autoInjectable()
@scoped(Lifecycle.ContainerScoped)
export class DebtCommand extends BaseCommand {
    constructor(private repository: DebtRepository) {
        super();
    }

    getAll = async (limit: number, page: number, order: string, userId?: string): Promise<any> => {
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
    getDebtById = async (_id: string | ObjectId): Promise<any> => {
        try {

            const result = await this.repository.findOne(new ObjectId(_id))
            return result
        } catch (ex) {
            return this.handleException(ex);
        }
    }
    deleteDebtById = async (_id: string | ObjectId): Promise<any> => {
        try {

            const result = await this.repository.delete(new ObjectId(_id))
            return result
        } catch (ex) {
            return this.handleException(ex);
        }
    }
    createDebt = async (userId: string, reason: string, debtDate: Date, value: number): Promise<any> => {
        try {

            const user = await JsonPlaceholderService.getUserById(userId)

            if (!user) {
                return this.addError("usuário não encontrado")
            }

            const dbt = DebtModel.create(userId, user.name, reason, debtDate, value)

            if (typeof dbt === "string") {
                return this.addError(dbt)
            }
            const insertedObj = await this.repository.create(dbt)
            if (!insertedObj) {
                return this.addError("Fail on inserted on database")
            }

            return insertedObj;
        } catch (ex) {
            return this.handleException(ex);
        }
    }
    updateDebtById = async (_id: string, reason?: string, debtDate?: Date, value?: number): Promise<any> => {
        try {

            const dbt = await this.repository.findOne({ _id: new ObjectId(_id) })

            if (!dbt) {
                return this.addError("Dívida não encontrada")
            }

            const debtToUpdate = DebtModel.update(_id, { reason, debtDate, value })

            if (typeof debtToUpdate === "string") {
                return this.addError(debtToUpdate)
            }

            if (!debtToUpdate._id) {
                return this.addError("Id não encontrado")
            }

            const isUpdated = await this.repository.update(debtToUpdate._id, debtToUpdate)


            if (!isUpdated) {
                return this.addError("Fail on inserted on database")
            }

            return isUpdated;
        } catch (ex) {
            return this.handleException(ex);
        }
    }

}

