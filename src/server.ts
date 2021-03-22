
import express, { Application, Request, Response } from 'express';




import cors from 'cors';
import signale from 'signale';
import { Db } from 'mongodb';
import bodyParser from 'body-parser';
import helmet from "helmet";

import { ValidationError } from 'express-validation';
// import MongoDb from './data/MongoDb';
import pjson from '../package.json';

export default class ApplicationServer {
    app: Application;

    mongoDb: Db;

    constructor(db?: Db) {
        this.app = express();

        if (db) {
            this.mongoDb = db;
        }
    }

    // private async configureDatabase(): Promise<Db> {
    //     return MongoDb.getDb();
    // }

    private configureMiddleware(): void {
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json({ limit: '10mb' }));

        this.app.get('/server-status', (_, res) => {
            res.send(pjson.version);
        });
    }

    private configureErrorRouter(): void {
        this.app.use((err: any, req: Request, resp: Response, next: any) => {
            if (err instanceof ValidationError || err.status === 400) {
                return resp.status(400).json(err);
            }
            if (err) {
                return resp.status(500).json(err);
            }
            resp.status(404);
            return resp.send({
                r: false,
                errors: ['404 - Not Found'],
            });
        });
    }


    private configureModules(app: Application, db: Db): void {
        // ExampleModule.configure(app, db);
    }

    async setupApp(): Promise<Application> {
        signale.success("start setupApp")
        // if (!this.mongoDb) {
        //     this.mongoDb = await this.configureDatabase();
        // }
        signale.success('DataBase');


        this.configureMiddleware();
        signale.success('Midlewares');

        this.configureModules(this.app, this.mongoDb);
        signale.success('Modules');

        this.configureErrorRouter();
        signale.success('ErrorRouter');


        return this.app;
    }
}
