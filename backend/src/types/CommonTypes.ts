export type TAuth = {
    roles?: string[];
    config?: {
    };
};

export type ResultPaginado<T> = {
    data: T;
    totalCount: number;
};

export type CommandName =
    | 'DebtCommand'