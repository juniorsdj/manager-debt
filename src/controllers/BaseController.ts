/* eslint-disable no-param-reassign */
import { Response, Request } from 'express';
import * as HttpStatus from 'http-status-codes';
import { TAuth, ResultPaginado } from '../types';

export interface IControllerMethodType {
    auth: TAuth;
    schema: any;
    fn: (req: Request, resp: Response) => Promise<any>;
}

interface IError {
    name?: string;
    errors: any | any[];
}

export default class BaseController<T> {
    OkPaginado(resp: Response, result: ResultPaginado<T[]>): void {
        resp.status(HttpStatus.StatusCodes.OK).send({
            r: true,
            data: result.data,
            totalCount: result.totalCount,
        });
    }

    Ok(
        resp: Response,
        result: T | T[] | Partial<T> | Partial<T>[] | true,
        statusCode = HttpStatus.StatusCodes.OK,
    ): void {
        const data = result;

        resp.status(statusCode).send({
            r: true,
            data,
        });
    }

    OkCustom(resp: Response, result: any, statusCode = HttpStatus.OK): void {
        const data = result;

        resp.status(statusCode).send({
            r: true,
            data,
        });
    }

    OkOnlyData(resp: Response, result: any): void {
        resp.status(HttpStatus.StatusCodes.OK).send(result);
    }

    Fail(resp: Response, errors: string[]): void {
        resp.status(HttpStatus.StatusCodes.OK).send({
            r: false,
            errors,
        });
    }

    BadRequest(resp: Response, errors: IError): void {
        const errorType = errors && errors.name ? errors.name : '';
        let error = null;

        switch (errorType) {
            case 'ValidationError':
                error = errors.errors;
                break;
            default:
                error = errors;
                break;
        }

        resp.locals.responseData = error;

        resp.status(HttpStatus.StatusCodes.BAD_REQUEST).send({
            r: false,
            errors: error,
        });
    }

    schemaError(resp: Response, error: string | Error): void {
        resp.locals.responseData = error;

        resp.status(HttpStatus.StatusCodes.BAD_REQUEST).send({
            r: false,
            error,
        });
    }

    ServerError(resp: Response, ex: string | Error): void {
        resp.locals.responseData = ex;

        const message =
            typeof ex === 'string' ? ex : `${ex.message}\n ${ex.stack}`;

        resp.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send({
            ex: message,
        });
    }
}
