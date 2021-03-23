import type {
    Router
} from 'express';
import { RouterBuilder } from './../helpers';
import { autoInjectable, container } from 'tsyringe';
import { IRouter } from './BaseRouter';
import { DebtController } from './../controllers';

@autoInjectable()
export class DebtRouter implements IRouter {
    constructor(private controller: DebtController) { }

    getRoutes(): Router {
        return new RouterBuilder()
            .get('/', this.controller.getAll)
            .get('/:_id', this.controller.getDebtById)
            .get('/users/:userId', this.controller.getDebtsByUserId)
            .post('/', this.controller.createDebt)
            .build()

    }

    static getRoutesStatic(): Router {
        return container.resolve<DebtRouter>('DebtRouter').getRoutes()
    }
}



