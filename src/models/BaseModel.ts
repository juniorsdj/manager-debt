import { ObjectId } from "mongodb";
import signale from "signale";

export default class BaseModel {

    createdAt: Date;

    updatedAt: Date;
    
    constructor() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    handleException(ex: Error): boolean {
        signale.error(ex);
        return false;
    }
}