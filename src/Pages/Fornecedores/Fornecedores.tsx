import React, { Component } from 'react'
import Box from '../../Components/Layout/Box'
import Breadcrumb from '../../Components/Layout/Breadcrumb'
import DashboardViewport from '../../Components/Layout/DashboardViewport'
import MetricOverview from '../../Components/Layout/MetricOverview'
import Menu from '../../Components/Menu/Menu'

export default class Fornecedores extends Component {
    render() {
        return (
            <DashboardViewport title="Fornecedores">

                <div className="columns cols-4">
                    <MetricOverview data={{ stat: 533, about: 'Usuários Cadastrados Hoje' }} name='usuários' link='/usuarios'></MetricOverview>
                    <MetricOverview data={{ stat: 230, about: 'Usuários Cadastrados em Novembro' }} name='casamentos' link='/casamentos'></MetricOverview>
                    <MetricOverview data={{ stat: 58, about: 'Usuários Cadastrados em Outubro' }} name='fornecedores' link='/fornecedores'></MetricOverview>
                    <MetricOverview data={{ stat: 500, about: 'Crescimento médio' }} name='Vendas' link='/vendas'></MetricOverview>
                </div>

                <div className="columns cols-2">
                    <Box title='Usuários Cadastrados em Novembro'></Box>
                    <Box title='Usuários Cadastrados'></Box>
                </div>
            </DashboardViewport>
        )
    }
}
