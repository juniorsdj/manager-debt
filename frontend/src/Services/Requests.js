import AxiosApi from './AxiosApi';


export const debtsRequests = {
    getAll: () => {
        return AxiosApi.get(`/debts`);
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
