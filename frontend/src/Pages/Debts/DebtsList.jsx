import React, { useEffect, useState } from 'react';
import { Container, Table, Pagination, Breadcrumb } from 'semantic-ui-react';
import { format } from 'date-fns';
import br from 'date-fns/locale/pt-BR';
import { debtsRequests } from './../../Services/Requests'
import { SIZE_DEFAULT_PAGE } from './../../constants'
const DebtsList = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [listDebts, setListDebts] = useState([])
    const [totalCountDebts, setTotalCountDebts] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [activePage, setActivePage] = useState(1)

    useEffect(() => {
        setIsLoading(true)


        debtsRequests.getAll({ page: activePage })
            .then((r) => {
                if (r.r) {
                    setIsLoading(false)
                    setListDebts(r.data)
                    setTotalCountDebts(r.totalCount)
                    setTotalPages(Math.ceil(r.totalCount / SIZE_DEFAULT_PAGE))
                }
            })
            .catch(
                err => {
                    setIsLoading(false)
                    console.log(err)
                }
            )
    }, [activePage])

    function handlePaginationChange(ev, { activePage }) {
        setActivePage(activePage)
    }
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
                <Table.Cell>{debt.debtDate ? format(
                    new Date(debt.debtDate),
                    'dd/MM/yyyy',
                    {
                        locale: br,
                    },
                )
                    : null}</Table.Cell>
                <Table.Cell>{debt.value}</Table.Cell>
                <Table.Cell>Actions</Table.Cell>
            </Table.Row>
        );
    }

    return (
        <Container>
            <Breadcrumb>
                <Breadcrumb.Section href="#/">
                    Início
                        </Breadcrumb.Section>
                <Breadcrumb.Divider icon="right angle" />
                <Breadcrumb.Section active>Dívidas</Breadcrumb.Section>
            </Breadcrumb>
            
            {!isLoading && (
                <div className="text-right">
                    <small>
                        {totalCountDebts} resultados.
                            </small>
                </div>
            )}
            <Table padded='very'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>UserId</Table.HeaderCell>
                        <Table.HeaderCell>Data de criação</Table.HeaderCell>
                        <Table.HeaderCell>Motivo</Table.HeaderCell>
                        <Table.HeaderCell>Data da dívida</Table.HeaderCell>
                        <Table.HeaderCell>Valor</Table.HeaderCell>
                        <Table.HeaderCell>Ações</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                {
                    listDebts.map(debt => renderDebtRow(debt))
                }
            </Table>
            <Pagination defaultActivePage={activePage} disabled={isLoading} onPageChange={handlePaginationChange} totalPages={totalPages} />
        </Container>
    );
};

export default DebtsList;