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
}