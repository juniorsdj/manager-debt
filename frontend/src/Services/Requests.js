import AxiosApi from './AxiosApi';
import queryString from 'query-string';

const stringifyQueryString = (obj) => {
    const keys = Object.keys(obj).filter(key => obj[key] != '');
    const retorno = {};
    keys.forEach(key => (retorno[key] = obj[key]));
    return queryString.stringify(retorno);
};


export const debtsRequests = {
    getAll: ({ page }) => {
        return AxiosApi.get(`/debts?${stringifyQueryString({ page })}`);
    },
    getDebtById: (_id) => {
        return AxiosApi.get(`/debts/${_id}`);
    },
    getDebtByUserId: (userId) => {
        return AxiosApi.get(`/debts/users/${userId}`);
    },
    deleteDebtById: (_id) => {
        return AxiosApi.delete(`/debts/${_id}`);
    },
}
