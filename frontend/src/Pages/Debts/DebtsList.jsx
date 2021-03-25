import React, { useEffect, useState } from 'react';
import { Container, Table, Pagination, Breadcrumb, Form, Dropdown, Icon } from 'semantic-ui-react';
import { format } from 'date-fns';
import br from 'date-fns/locale/pt-BR';
import { debtsRequests } from './../../Services/Requests'
import { SIZE_DEFAULT_PAGE } from './../../constants'
import DebtForm from './DebtForm'

const OPTIONS_SORT = [
    {
        key: "value_asc",
        value: "value_asc",
        text: "Valor da dívida crescente"
    },
    {
        key: "value_desc",
        value: "value_desc",
        text: "Valor da dívida decrescente"
    },
    {
        key: "debt_date_asc",
        value: "debt_date_asc",
        text: "Data da dívida crescente"
    },
    {
        key: "debt_date_desc",
        value: "debt_date_desc",
        text: "Data da dívida decrescente"
    },
]
const DebtsList = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isUpdatedList, setIsUpdatedList] = useState(false)
    const [listDebts, setListDebts] = useState([])
    const [totalCountDebts, setTotalCountDebts] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [activePage, setActivePage] = useState(1)
    const [sortSearch, setSortSearch] = useState("debt_date_desc")
    const [modalIsOpened, setModalIsOpened] = useState(false)
    const [debtSelected, setDebtSelected] = useState({})


    useEffect(() => {
        setIsLoading(true)


        debtsRequests.getAll({ page: activePage, sort: sortSearch })
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
    }, [activePage, sortSearch, isUpdatedList])


    function removeDebt(debtId) {
        if (!window.confirm("Você deseja realmente excluir essa dívida?")) return null
        setIsLoading(true)
        debtsRequests.deleteDebtById(debtId)
            .then((r) => {
                if (r.r) {
                    setIsLoading(false)
                    setListDebts(listDebts.filter(debt => debt._id !== debtId))
                    setTotalCountDebts(totalCountDebts - 1)
                    setTotalPages(Math.ceil(totalCountDebts / SIZE_DEFAULT_PAGE))
                }
            })
            .catch(
                err => {
                    setIsLoading(false)
                    console.log(err)
                }
            )
    }
    function handlePaginationChange(ev, { activePage }) {
        setActivePage(activePage)
    }
    function renderDebtRow(debt) {
        return (
            <Table.Row
                textAlign='center'
                key={debt._id}
                onClick={() => {
                    setDebtSelected(debt)
                    setModalIsOpened(true)
                }}
            >
                <Table.Cell>{debt.userName}</Table.Cell>
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
                <Table.Cell >
                    <div style={{ padding: 20 }} onClick={(e) => {
                        e.stopPropagation()
                        removeDebt(debt._id)
                    }}>
                        <Icon name="trash alternate" />
                    </div>


                </Table.Cell>
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


            <Form
                className="small-margin-top"
                onSubmit={() =>
                    this.setState({ page: 1 }, () => this.getPlaces())
                }
            >
                <Form.Group>
                    <Form.Field
                        id="form-input-control-last-name"
                        control={Dropdown}
                        width={6}
                        label="Ordenação"
                        selection
                        search
                        disabled={isLoading}
                        options={OPTIONS_SORT}
                        value={sortSearch}
                        onChange={(ev, { value }) =>
                            setSortSearch(value)
                        }
                    />
                </Form.Group>
            </Form>


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
                        <Table.HeaderCell>Nome</Table.HeaderCell>
                        <Table.HeaderCell>Data de criação</Table.HeaderCell>
                        <Table.HeaderCell>Motivo</Table.HeaderCell>
                        <Table.HeaderCell>Data da dívida</Table.HeaderCell>
                        <Table.HeaderCell>Valor</Table.HeaderCell>
                        <Table.HeaderCell>Ações</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        listDebts.map(debt => renderDebtRow(debt))
                    }
                </Table.Body>
            </Table>
            <Pagination defaultActivePage={activePage} disabled={isLoading} onPageChange={handlePaginationChange} totalPages={totalPages} />


            <DebtForm debt={debtSelected} isOpened={modalIsOpened} onClose={() => {
                setIsUpdatedList(!isUpdatedList)
                setModalIsOpened(false)
            }} />

        </Container>
    );
};

export default DebtsList;