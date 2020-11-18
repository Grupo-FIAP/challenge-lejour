import React, { Component } from 'react'
import Box from '../../Components/Layout/Box'
import Breadcrumb from '../../Components/Layout/Breadcrumb'
import DashboardViewport from '../../Components/Layout/DashboardViewport'
import MetricOverview from '../../Components/Layout/MetricOverview'
import Menu from '../../Components/Menu/Menu'
import { WeddingModel } from '../../Shared/Models/wedding'
import { WeddingService } from '../../Shared/Services/WeddingService'

import IconeCerimonia from '../../assets/icons/icone_cerimonia.svg';

export default class Casamentos extends Component {

    weddingService: WeddingService;
    weddings: WeddingModel[] = [];

    constructor(props) {
        super(props);

        this.weddingService = new WeddingService();
        this.weddings = this.weddingService.GetAll();
    }

    renderNextWeddings() {
        return this.weddings.map((wedding: WeddingModel) => {
            const { Id, WeddingDate, Style, OwnerId } = wedding;

            return (
                <tr>
                    <td>{Id}</td>
                    <td>{WeddingDate.toLocaleDateString()}</td>
                    <td>{OwnerId}</td>
                    <td>{Style}</td>
                    <td>{OwnerId}</td>
                </tr>
            )
        });
    }

    render() {
        return (
            <DashboardViewport title="Casamentos">

                <div className="columns cols-4">
                    <MetricOverview data={{ stat: 533, about: 'Casamentos realizados' }} icon={IconeCerimonia} name='usuários'></MetricOverview>
                    <MetricOverview data={{ stat: 230, about: 'Casamentos em Novembro' }} icon={IconeCerimonia} name='casamentos'></MetricOverview>
                    <MetricOverview data={{ stat: 58, about: 'Casamentos nos últimos 6 meses' }} icon={IconeCerimonia} name='fornecedores'></MetricOverview>
                    <MetricOverview data={{ stat: 500, about: 'Casamentos nos últimos 12 meses' }} icon={IconeCerimonia} name='Vendas'></MetricOverview>
                </div>

                <div className="columns cols-2">
                    <Box title='Casamentos' customStyle={{ gridColumn: '1 / span 2' }}>
                    <div className="field">
                            <label htmlFor="" className="label">Pesquisar Casamento</label>
                            <div className="control">
                                <input type="text" className="input" placeholder="Faça a sua pesquisa"/>
                            </div>
                            <sub>A pesquisa será feita em todos os campos de casamento</sub>
                        </div>
                        <div className="scroll-box">
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Data</th>
                                        <th>Casal</th>
                                        <th>Estilo</th>
                                        <th>Usuário</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderNextWeddings()}
                                </tbody>
                            </table>
                        </div>
                    </Box>
                </div>
            </DashboardViewport>
        )
    }
}
