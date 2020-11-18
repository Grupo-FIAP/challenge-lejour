import React, { Component } from 'react'
import Box from '../../Components/Layout/Box'
import Breadcrumb from '../../Components/Layout/Breadcrumb'
import DashboardViewport from '../../Components/Layout/DashboardViewport'
import MetricOverview from '../../Components/Layout/MetricOverview'
import Menu from '../../Components/Menu/Menu'

import IconeFornecedores from '../../assets/icons/icone_fornecedores.svg';

export default class Fornecedores extends Component {

    render() {
        return (
            <DashboardViewport title="Fornecedores">

                <div className="columns cols-4">
                    <MetricOverview data={{ stat: 533, about: 'Fornecedores Cadastrados' }} icon={IconeFornecedores} name='usuários'></MetricOverview>
                    <MetricOverview data={{ stat: 230, about: 'Fornecedores Cadastrados em Novembro' }} icon={IconeFornecedores} name='casamentos'></MetricOverview>
                    <MetricOverview data={{ stat: 58, about: 'Fornecedores Cadastrados nos últimos 6 meses' }} icon={IconeFornecedores} name='fornecedores'></MetricOverview>
                    <MetricOverview data={{ stat: 500, about: 'Fornecedores Cadastrados nos últimos 12 meses' }} icon={IconeFornecedores} name='Vendas'></MetricOverview>
                </div>

                <div className="columns cols-2">
                    <Box customStyle={{ gridColumn: '1 / span 2'}} title='Fornecedores Cadastrados'></Box>
                </div>
            </DashboardViewport>
        )
    }
}
