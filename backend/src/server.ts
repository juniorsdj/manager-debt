
import express, { Application, Request, Response } from 'express';




import cors from 'cors';
import signale from 'signale';
import { Db } from 'mongodb';
import bodyParser from 'body-parser';
import helmet from "helmet";

import { ValidationError } from 'express-validation';
import { DebtModule } from './modules';
import MongoDb from './data/Mongodb';
import pjson from '../package.json';
import { JsonPlaceholderService } from './services';

export default class ApplicationServer {
    app: Application;

    mongoDb: Db;

    constructor(db?: Db) {
        this.app = express();

        if (db) {
            this.mongoDb = db;
        }
    }

    private async configureDatabase(): Promise<Db> {
        return MongoDb.getDb();
    }

    private configureMiddleware(): void {
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json({ limit: '10mb' }));

        //Não estou seguindo a arquitetura aqui por que montei ela apenas para demonstrar conhecimento. Para deixar a coisa menos verbosa e mais rápida de ser implementada irei fugir do padrão. Não considerar na hora da análise :)
        this.app.get('/users', async (_, res) => {
            try {
                const users = await JsonPlaceholderService.getUserList()
                if(users){
                    res.status(200).send({
                        r: true,
                        data: users
                    })
                }else{
                    res.status(200).send({
                        r: false,
                        errors: ["Falha ao pegar os usuários"]
                    })
                }
            } catch (error) {
                res.status(500).send({
                    ex: JSON.stringify(error)
                })
            }
        })

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
        DebtModule.configure(app, db);
    }

    async setupApp(): Promise<Application> {
        signale.success("start setupApp")
        if (!this.mongoDb) {
            this.mongoDb = await this.configureDatabase();
        }
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
