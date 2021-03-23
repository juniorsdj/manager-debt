import Joi from 'joi';

import { container, singleton } from 'tsyringe';

@singleton()
export class DebtController {
    get about(): IControllerMethodType {
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
            fn: async (req: Request, res: Response): Promise<void> => {
                try {
                    const command = this.getCommand();


                    const result = await command.about();

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