import React, { Component, createRef, Ref, RefObject } from 'react'

// Importação de Icones e SVGs
import IconeNoivos from '../../assets/icons/icone_noivos.svg';
import IconeCerimonia from '../../assets/icons/icone_cerimonia.svg';
import IconeFornecedores from '../../assets/icons/icone_fornecedores.svg';
import IconeOrcamento from '../../assets/icons/icone_orcamento.svg';

import MetricOverview from '../../Components/Layout/MetricOverview'
import Menu from '../../Components/Menu/Menu'
import Breadcrumb from '../../Components/Layout/Breadcrumb';
import Box from '../../Components/Layout/Box';
import Chart from 'chart.js';
import { DateHelper } from '../../Shared/Helpers/DateHelper';
import ChartColors from '../../Shared/Helpers/ChartColors';
import GoalBar from '../../Components/Layout/GoalBar';
import ColorHelper from '../../Shared/Helpers/ColorHelper';


export default class Dashboard extends Component {

    chartRef;

    constructor(props) {
        super(props);

        this.chartRef = React.createRef();
    }

    componentDidMount() {
        const last6Months = DateHelper.GetLastMonths(6, true);
        const randomNumbers = ( quantity, range, minimum = 0 ) => {
            const result: number[] = [];

            for( let i = 0; i < quantity; i++ ) {
                result.push( Math.random() * range );
            }

            return result;
        }
        let colorIndex = 0;

        const chart = new Chart( this.chartRef.current, {
            type: 'line',
            data: {
                labels: last6Months,
                datasets: [{
                        label: 'Casamentos',
                        data: randomNumbers( 6, 50, 5 ),
                        backgroundColor: ColorHelper.hexToRgba( ChartColors[colorIndex++], 0.1, true ).toString(),
                        borderColor: ChartColors[colorIndex]
                    },{
                        label: 'Usuários',
                        data: randomNumbers( 6, 150, 10 ),
                        backgroundColor: ColorHelper.hexToRgba( ChartColors[colorIndex++], 0.1, true ).toString(),
                        borderColor: ChartColors[colorIndex]
                    },{
                        label: 'Fornecedores',
                        data: randomNumbers( 6, 150, 10 ),
                        backgroundColor: ColorHelper.hexToRgba( ChartColors[colorIndex++], 0.1, true ).toString(),
                        borderColor: ChartColors[colorIndex]
                    },{
                        label: 'Vendas',
                        data: randomNumbers( 6, 150, 10 ),
                        backgroundColor: ColorHelper.hexToRgba( ChartColors[colorIndex++], 0.1, true ).toString(),
                        borderColor: ChartColors[colorIndex]
                    }
                ],
            },
            options: {
            }
        } );

        const query_params = new URLSearchParams({
            'limit': 10
          });
          var url = 'https://sheet2api.com/v1/ByR2h1huRjyQ/fiap/user?' + query_params;
          
          fetch(url)
            .then(response => response.json())
            .then(data => {
              console.log('Success:', data);
            })
            .catch((error) => {
              console.error('Error:', error);
            });
    }

    render() {
        const breadcrumbRoute = [];

        const rnd = ( range, minimum = 0, round = true ) => {
            let result: number = minimum;
            result += Math.random() * range

            if( round ) {
                result = Math.round( result );
            }

            return result;
        }

        return (
            <>
                <Menu/>
                <div className="dashboard-viewport">
                    <h1>Visão Geral</h1>
                    <Breadcrumb></Breadcrumb>
                    <div className="columns cols-4">
                        <MetricOverview data={{ stat: 533, about: 'Usuários Cadastrados' }} icon={IconeNoivos} name='usuários' link='/usuarios'></MetricOverview>
                        <MetricOverview data={{ stat: 230, about: 'Casamentos Realizados' }} icon={IconeCerimonia} name='casamentos' link='/casamentos'></MetricOverview>
                        <MetricOverview data={{ stat: 58, about: 'Fornecedores Cadastrados' }} icon={IconeFornecedores} name='fornecedores' link='/fornecedores'></MetricOverview>
                        <MetricOverview data={{ stat: 'R$ 20.000,00', about: 'Vendas Feitas' }} icon={IconeOrcamento} name='Vendas' link='/vendas'></MetricOverview>
                    </div>
                    
                    <div className="columns cols-3">
                        <Box transparent title='Gráfico de acompanhamento de desempenho' customStyle={{ gridColumn: "1 / span 2", maxHeight: '400px' }} >
                            <canvas ref={ this.chartRef } style={{ width: '100%', height: '100%', minHeight: '40vh'  }}></canvas>
                        </Box>
                        <Box title='Metas' transparent>
                            <h4>Metas de 2020</h4>
                            <GoalBar goalName='Faturamento total' goal={50000} goalCurrent={rnd(40000, 10000, false)} isCurrency={{ digits: 2, preffix: 'R$' }} ></GoalBar>
                            <div className="spacer-1"></div>
                            <h4>Metas de Novembro</h4>
                            <GoalBar goalName='Casamentos realizados' goal={50} goalCurrent={rnd(50, 10)} ></GoalBar>
                            <GoalBar goalName='Usuários cadastrados' goal={200} goalCurrent={rnd(100, 20)} ></GoalBar>
                            <GoalBar goalName='Fornecedores cadastrados' goal={5} goalCurrent={rnd(5, 0)} ></GoalBar>
                            <GoalBar goalName='Faturamento' goal={20000} goalCurrent={rnd(20000, 1000, false)} isCurrency={{ digits: 2, preffix: 'R$' }} ></GoalBar>
                        </Box>
                    </div>

                    <div className="columns cols-4">
                        <Box title='Últimos usuários cadastrados' customStyle={{ gridColumn: "1 / span 2" }}>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nome</th>
                                        <th>E-mail</th>
                                        <th>Telefone</th>
                                        <th>Origem</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>0</td>
                                        <td>Nome Exemplo</td>
                                        <td>email@teste.com</td>
                                        <td>11 99887-5544</td>
                                        <td>Google Adwords</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Nome Exemplo</td>
                                        <td>email@teste.com</td>
                                        <td>11 99887-5544</td>
                                        <td>Google Adwords</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Nome Exemplo</td>
                                        <td>email@teste.com</td>
                                        <td>11 99887-5544</td>
                                        <td>Google Adwords</td>
                                    </tr>
                                </tbody>
                            </table>
                        </Box>
                        <Box title='Casamentos próximos' customStyle={{ gridColumn: "3 / span 2" }}>
                        <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Data</th>
                                        <th>Casal</th>
                                        <th>Local</th>
                                        <th>Fornecedor</th>
                                        <th>Origem</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>00/00/0000</td>
                                        <td>João & Maria</td>
                                        <td>email@teste.com</td>
                                        <td>11 99887-5544</td>
                                        <td>Google Adwords</td>
                                    </tr>
                                    <tr>
                                        <td>00/00/0000</td>
                                        <td>Paulo & Pedro</td>
                                        <td>email@teste.com</td>
                                        <td>11 99887-5544</td>
                                        <td>Google Adwords</td>
                                    </tr>
                                    <tr>
                                        <td>00/00/0000</td>
                                        <td>Sueli & Cassandra</td>
                                        <td>email@teste.com</td>
                                        <td>11 99887-5544</td>
                                        <td>Google Adwords</td>
                                    </tr>
                                </tbody>
                            </table>
                        </Box>
                    </div>

                    <div className="columns cols-3">
                        <Box title='Tabela 1'></Box>
                        <Box title='Tabela 2'></Box>
                        <Box title='Tabela 3'></Box>
                    </div>
                </div>
            </>
        )
    }
}
