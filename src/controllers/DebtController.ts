import Joi from 'joi';
import { Response, Request } from 'express'
import { container, singleton } from 'tsyringe';
import { DebtCommand } from '../commands';
import BaseController, { IControllerMethodType } from './BaseController';

@singleton()
export class DebtController extends BaseController<any>{
    constructor() {
        super();
    }
    getCommand(): DebtCommand {
        return container.createChildContainer().resolve('DebtCommand')
    }
    get getAll(): IControllerMethodType {
        return {
            auth: {
                roles: [],
                config: {

                }
            },
            schema: {
                body: Joi.object({
                })

            },
            fn: async (_req: Request, res: Response): Promise<void> => {
                try {
                    const command = this.getCommand();


                    const result = await command.getAll();

                    if (!result || !command.isValid()) {
                        return this.Fail(res, command.errors);
                    }

                    return this.Ok(res, result);

                } catch (ex) {
                    this.ServerError(res, ex)
                }
            }
        }
    }
    get createDebt(): IControllerMethodType {
        return {
            auth: {
                roles: [],
                config: {

                }
            },
            schema: {
                body: Joi.object({
                    userId: Joi.string().required(),
                    reason: Joi.string().required(),
                    debtDate: Joi.date().required(),
                    value: Joi.number().required()
                })

            },
            fn: async (req: Request, res: Response): Promise<void> => {
                try {
                    const {
                        userId, reason, debtDate, value
                    }:{
                        userId: string,
                        reason: string,
                        debtDate: Date,
                        value: number,
                    } = req.body
                    const command = this.getCommand();


                    const result = await command.createDebt(userId, reason, new Date(debtDate), value);

                    if (!result || !command.isValid()) {
                        return this.Fail(res, command.errors);
                    }

                    return this.Ok(res, result);

                } catch (ex) {
                    this.ServerError(res, ex)
                }
            }
        }
    }
}