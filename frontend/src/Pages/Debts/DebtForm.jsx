import React, { useEffect, useState } from 'react';
import { Form, Button, Modal, Header } from 'semantic-ui-react'
import { useForm } from 'react-hook-form';
import br from 'date-fns/locale/pt-BR';
import { usersRequests, debtsRequests } from './../../Services/Requests'
import { SelectField } from '../../components/form/FormFields';
import { format } from 'date-fns';

import './index.css'

const DebtForm = ({ debt, isOpened, onClose }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [usersOptions, setUsersOptions] = useState([])
    const [actionForm, setActionForm] = useState('Cadastrar');

    const { handleSubmit, register, setValue } = useForm();

    const handleSubmitForm = async (data) => {
        try {
            switch (actionForm) {
                case 'Cadastrar':
                    return await createDebt(data);
                case 'Editar':
                    if (debt)
                        await editDebt(debt._id, data);
                    return;
            }
            console.log(data)
        } catch (err) {
            console.log(err)
        }
    }
    const createDebt = async (data) => {
        setIsLoading(true)
        debtsRequests.createDebt(data)
            .then(r => {
                setIsLoading(false)
                if (r.r) {
                    console.log("sucesso")
                    onClose(true)
                } else {
                    console.log(r.errors)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    const editDebt = async (debtId, data) => {
       console.log(data)
    }



    function adjustValuesToEdit(debt) {
        setActionForm('Editar');
        setValue('userId', Number(debt.userId));
        debt.debtDate && setValue('debtDate', format(
            new Date(debt.debtDate),
            'yyyy-MM-dd',
            {
                locale: br,
            },
        ));
        setValue('value', debt.value);
        setValue('reason', debt.reason);
    }



    useEffect(() => {
        setIsLoading(true)
        usersRequests.getAll()
            .then(r => {
                setIsLoading(false)
                if (r.r) {
                    setUsersOptions(r.data.map(user => {
                        return {
                            value: user.id,
                            text: user.name
                        }
                    }))
                } else {
                    //aqui seria interessante implementar um toast para mostrar que os errors que veio do back
                    console.log(r.errors)
                }
            }).catch(err => {
                //seria interessante colocar uma melhor tratativa do erro, como um toast 
                setIsLoading(false)
                console.log(err)
            })

    }, [])

    useEffect(() => {
        if (debt) {
            adjustValuesToEdit(debt);
        }
    }, [debt]);
    return (
        <Modal
            onClose={onClose}
            open={isOpened}
        >
            <Header icon='money bill alternate outline' content='Dívida' />
            <Modal.Content>
                <Form id="id-form" onSubmit={handleSubmit(handleSubmitForm)}>
                    <Form.Group inline widths='equal'>

                        <Form.Field className="required">
                            <SelectField
                                name='userId'
                                label='Nome'
                                register={register}
                                options={usersOptions}
                                setValue={setValue}
                                required
                                placeholder='José de Abreu da Silva'
                            />
                        </Form.Field>

                        <Form.Field className="required">
                            <label>Motivo</label>
                            <div className="ui fluid input">
                                <input ref={register} name="reason" placeholder="Cartão de crédito"
                                    required
                                    type="text" />
                            </div>
                        </Form.Field>
                        <Form.Field className="required">
                            <label>Valor</label>
                            <div className="ui fluid input">
                                <label>R$</label>
                                <input ref={register} name="value" step="0.01" placeholder="40,00"
                                    required
                                    type="number" />
                            </div>
                        </Form.Field>


                    </Form.Group>
                    <Form.Group inline widths="4">
                        <Form.Field className="required">
                            <label>Data da  dívida</label>
                            <div className="ui fluid input">
                                <input ref={register} name="debtDate" placeholder="01/01/2021"
                                    required
                                    type="date" />
                            </div>
                        </Form.Field>
                    </Form.Group>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={onClose}>
                    Cancelar
                </Button>
                <Button form="id-form" color="green"
                    loading={isLoading}
                    disabled={isLoading}>
                    {actionForm}
                </Button>
            </Modal.Actions>
        </Modal >
    );
};

export default DebtForm;