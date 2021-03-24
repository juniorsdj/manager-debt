import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DebtsList from './DebtsList';

const Debts = () => {
    return (
        <>
            <Switch>
                <Route path="/dividas" component={DebtsList} exact />
            </Switch>
        </>
    );
};

export default Debts;