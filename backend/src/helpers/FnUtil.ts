import { isNil, omitBy } from "lodash";

export const removeNil = (object: any): any => {
    return omitBy(object, isNil);
};