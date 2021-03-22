import 'reflect-metadata';

import { container } from 'tsyringe';
import { Application } from 'express';
import { Db } from 'mongodb';

import { collections } from '../data/MongoDb';

import { IDebt } from './../types';

export class DebtModule {
    static configure(app: Application, db: Db): void {
        this.configureDI(db);
    }


    static configureDI(db: Db): void {
        this.configureClassDI();
        this.configureDBDI(db)
    }


    static configureDBDI(db: Db): void {
        container.register('DebtCollection', {
            useValue: db.collection<IDebt>(collections.debt),
        });
    }

    static configureClassDI(): void {
    }
}
