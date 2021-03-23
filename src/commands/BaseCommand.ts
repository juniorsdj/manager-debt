/* eslint-disable import/no-cycle */
import { container } from 'tsyringe';
import { CommandName } from './../types';
class BaseCommand {
    errors: string[] = [];

    isValid(): boolean {
        return this.errors.length === 0;
    }

    addError(
        errorMessage: string,
    ): false {
        this.errors.push(errorMessage);
        return false;
    }


    addErrors(errors: string[], prefix = ''): false {
        errors.forEach((message: string) => {
            this.addError(`${prefix ? `${prefix}.` : ''}${message}`);
        });

        return false;
    }

    clear(): string[] {
        this.errors = [];
        return this.errors;
    }

    handleException(
        ex: Error,
    ): false {
        return this.addError(ex.message);
    }

    getCommand<T>(commandName: CommandName): T {
        return container.createChildContainer().resolve<T>(commandName);
    }
}

export default BaseCommand;
