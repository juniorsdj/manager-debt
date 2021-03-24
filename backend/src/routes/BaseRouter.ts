import { Router } from 'express';

export interface IRouter {
    getRoutes(controller: any): Router;
}
