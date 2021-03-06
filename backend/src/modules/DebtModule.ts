import 'reflect-metadata';

import { container } from 'tsyringe';
import { Application } from 'express';
import { Db } from 'mongodb';

import { collections } from '../data/Mongodb';

import { IDebt } from './../types';
import { DebtRouter } from './../routes';
import { DEBT_PATH_PREFIX } from './../constants'
import { DebtController } from '../controllers';
import { DebtCommand } from '../commands';
import { DebtRepository } from '../repository';
export class DebtModule {
    static configure(app: Application, db: Db): void {
        this.configureDI(db);
        this.configureRoutes(app);
    }


    static configureDI(db: Db): void {
        this.configureClassDI();
        this.configureDBDI(db)
    }


    static configureRoutes(app: Application): void {
        app.use(DEBT_PATH_PREFIX, DebtRouter.getRoutesStatic());
    }

    static configureDBDI(db: Db): void {
        container.register('DebtCollection', {
            useValue: db.collection<IDebt>(collections.debt),
        });
    }

    static configureClassDI(): void {
        container.register('DebtRepository', {
            useClass: DebtRepository,
        });
        container.register('DebtCommand', {
            useClass: DebtCommand,
        });

        container.register('DebtController', {
            useClass: DebtController,
        });

        container.register('DebtRouter', {
            useClass: DebtRouter,
        });
    }
}
