/* eslint-disable @typescript-eslint/ban-types */
import { validate } from 'express-validation';
import express, { Router, RequestHandler, request } from 'express';

// import { IControllerMethodType } from '../controller/BaseController';

export default class RouterBuilder {
    private router: Router;

    constructor(router?: Router) {
        this.router = router || express.Router();
    }

    /**
     * Retorna o objeto de rotas, com a stack configurada
     */
    build(): Router {
        return this.router;
    }

    /**
     * @description Método que recebe uma função documentar endpoint
     */
    doc(fn: Function): RouterBuilder {
        fn();
        return this;
    }

    get(
        path: string,
        method: any,
        // method: IControllerMethodType,
        cacheTime?: number,
    ): RouterBuilder {
        const handlers = this.generateRequestHandler(method, cacheTime);

        this.router.get(path, ...handlers);

        return this;
    }

    post(
        path: string,
        method: any,
        cacheTime?: number,
    ): RouterBuilder {
        const handlers = this.generateRequestHandler(method, cacheTime);

        this.router.post(path, ...handlers);

        return this;
    }

    put(
        path: string,
        method: any,
        cacheTime?: number,
    ): RouterBuilder {
        const handlers = this.generateRequestHandler(method, cacheTime);

        this.router.put(path, ...handlers);

        return this;
    }

    delete(
        path: string,
        method: any,
        cacheTime?: number,
    ): RouterBuilder {
        const handlers = this.generateRequestHandler(method, cacheTime);

        this.router.delete(path, ...handlers);

        return this;
    }

    /**
     * @description Gera os handlers que serão utilizados pelos verbos HTTP
     *
     * @param {IControllerMethodType} method Método da controller
     * @param {number} cacheTime Tempo (em segundos) que armazenará cache
     */
    private generateRequestHandler(
        method: any,
        cacheTime?: number,
    ): RequestHandler[] {
        const requestHandlers = [validate(method.schema)];
        //TODO verificar o auth
        // const requestHandlers = [validate(method.schema), auth(method.auth)];

        //TODO Verificar o cacheTime
        // if (cacheTime) {
        //     requestHandlers.push(cache(cacheTime));
        // }

        requestHandlers.push(method.fn);

        return requestHandlers;
    }
}
