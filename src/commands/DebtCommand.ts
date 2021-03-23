import 'reflect-metadata';
import { autoInjectable, scoped, Lifecycle } from 'tsyringe';
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

}

