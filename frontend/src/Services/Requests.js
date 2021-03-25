import AxiosApi from './AxiosApi';
import queryString from 'query-string';

const stringifyQueryString = (obj) => {
    // eslint-disable-next-line 
    const keys = Object.keys(obj).filter(key => obj[key] != '');
    const retorno = {};
    keys.forEach(key => (retorno[key] = obj[key]));
    return queryString.stringify(retorno);
};


export const debtsRequests = {
    getAll: ({ page, sort }) => {
        return AxiosApi.get(`/debts?${stringifyQueryString({ page, sort })}`);
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
    createDebt: ({ userId, reason, value, debtDate }) => {
        return AxiosApi.post(`/debts`, {
            userId: String(userId), reason, value: Number(value), debtDate
        });
    },
}

export const usersRequests = {
    getAll: () => {
        return AxiosApi.get(`/users`);
    }
}
