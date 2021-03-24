import React, { useEffect, useState } from 'react';
import { Container, Table } from 'semantic-ui-react';
import { format } from 'date-fns';
import br from 'date-fns/locale/pt-BR';
import { debtsRequests } from './../../Services/Requests'
const debts = [
    {
        "_id": "605944a440bc0a3ecef4da46",
        "createdAt": "2021-03-23T01:30:12.473Z",
        "updatedAt": "2021-03-23T01:30:12.473Z",
        "userId": "1",
        "reason": "ta devendo um bocado",
        "debtDate": "2021-03-23T01:10:33.210Z",
        "value": 500
    },
    {
        "_id": "605944a540bc0a3ecef4da47",
        "createdAt": "2021-03-23T01:30:13.073Z",
        "updatedAt": "2021-03-23T01:30:13.073Z",
        "userId": "1",
        "reason": "ta devendo um bocado",
        "debtDate": "2021-03-23T01:10:33.210Z",
        "value": 500
    },
    {
        "_id": "605944a540bc0a3ecef4da48",
        "createdAt": "2021-03-23T01:30:13.565Z",
        "updatedAt": "2021-03-23T01:30:13.565Z",
        "userId": "1",
        "reason": "ta devendo um bocado",
        "debtDate": "2021-03-23T01:10:33.210Z",
        "value": 500
    }]

const DebtsList = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [listDebts, setListDebts] = useState([])

    useEffect(() => {
        setIsLoading(true)


        debtsRequests.getAll()
            .then((r) => {
                if (r.r) {
                    setIsLoading(false)
                    setListDebts(r.data)
                }
            })
            .catch(
                err => {
                    setIsLoading(false)
                    console.log(err)
                }
            )
    }, [])

    function renderDebtRow(debt) {
        return (
            <Table.Row
                textAlign='center'
                key={debt._id}
                onClick={(item) => {
                    console.log(item)

                    // setAction(undefined);
                    // dispatch(
                    //     DeliveriesActions.deliverySelected(delivery as any),
                    // );
                }}
            >
                <Table.Cell>{debt.userId}</Table.Cell>
                <Table.Cell> {debt.createdAt
                    ? format(
                        new Date(debt.createdAt),
                        'dd/MM/yyyy HH:mm',
                        {
                            locale: br,
                        },
                    )
                    : null}</Table.Cell>
                <Table.Cell>{debt.reason}</Table.Cell>
                <Table.Cell>{debt.debtDate}</Table.Cell>
                <Table.Cell textAlign='left'>{debt.value}</Table.Cell>
                <Table.Cell textAlign='right'>Actions</Table.Cell>
            </Table.Row>
        );
    }

    return (
        <Container>
            <h1> Debts list</h1>
            <Table>
                <Table.Header>
                    <Table.Row textAlign='center'>
                        <Table.HeaderCell>UserId</Table.HeaderCell>
                        <Table.HeaderCell>Data de criação</Table.HeaderCell>
                        <Table.HeaderCell>Motivo</Table.HeaderCell>
                        <Table.HeaderCell>Data da dívida</Table.HeaderCell>
                        <Table.HeaderCell textAlign='left'>Valor</Table.HeaderCell>
                        <Table.HeaderCell textAlign='right'>Ações</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                {
                    debts.map(debt => renderDebtRow(debt))
                }
            </Table>

        </Container>
    );
};

export default DebtsList;