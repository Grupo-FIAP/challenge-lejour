import React, { Component } from 'react'
import Box from '../../Components/Layout/Box'
import DashboardViewport from '../../Components/Layout/DashboardViewport'
import MetricOverview from '../../Components/Layout/MetricOverview'
import { UserService } from '../../Shared/Services/UserService'
import IconeNoivos from '../../assets/icons/icone_noivos.svg';

export default class Usuarios extends Component {

    usersService;
    users;

    constructor( props ) {
        super(props);
        this.usersService = new UserService();
        this.users = this.usersService.GetAll();
    }

    renderLastUsers() {
        return this.users.map(user => {
            const { Id, Name, Username, CreatedAt, Phone, Origem } = user;

            return (
                <tr>
                    <td>{Id}</td>
                    <td>{CreatedAt.toLocaleDateString()}</td>
                    <td>{Name}</td>
                    <td>{Username}</td>
                    <td>{Phone}</td>
                    <td>{Origem}</td>
                </tr>
            )
        });
    }


    render() {
        return (
            <DashboardViewport title="Usuários">

                <div className="columns cols-4">
                    <MetricOverview data={{ stat: 533, about: 'Usuários Cadastrados' }} icon={IconeNoivos} name='usuários' ></MetricOverview>
                    <MetricOverview data={{ stat: 230, about: 'Usuários Cadastrados em Novembro' }} icon={IconeNoivos} name='casamentos' ></MetricOverview>
                    <MetricOverview data={{ stat: 58, about: 'Usuários Cadastrados nos últimos 6 meses' }} icon={IconeNoivos} name='fornecedores' ></MetricOverview>
                    <MetricOverview data={{ stat: 500, about: 'Usuários Cadastrados nos últimos 12 meses' }} icon={IconeNoivos} name='Vendas' ></MetricOverview>
                </div>

                <div className="columns cols-2">
                    <Box title='Usuários Cadastrados' customStyle={{ gridColumn: '1 / span 2'}}>
                        <div className="field">
                            <label htmlFor="" className="label">Pesquisar Usuário</label>
                            <div className="control">
                                <input type="text" className="input" placeholder="Faça a sua pesquisa. Ex: joao, @gmail, adwords"/>
                            </div>
                            <sub>A pesquisa será feita em todos os campos de usuário</sub>
                        </div>
                        <div className="scroll-box">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Data de Cadastro</th>
                                        <th>Nome</th>
                                        <th>E-mail</th>
                                        <th>Telefone</th>
                                        <th>Origem</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { this.renderLastUsers() }
                                </tbody>
                            </table>
                        </div>
                    </Box>
                </div>
            </DashboardViewport>
        )
    }
}
