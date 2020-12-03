import React, { Component } from 'react'
import Box from '../../Components/Layout/Box'
import Breadcrumb from '../../Components/Layout/Breadcrumb'
import DashboardViewport from '../../Components/Layout/DashboardViewport'
import MetricOverview from '../../Components/Layout/MetricOverview'
import Menu from '../../Components/Menu/Menu'
import { WeddingModel } from '../../Shared/Models/wedding'
import { WeddingService } from '../../Shared/Services/WeddingService'

import IconeCerimonia from '../../assets/icons/icone_cerimonia.svg';
import { DateHelper } from '../../Shared/Helpers/DateHelper'
import Chart from 'chart.js'
import ChartColors from '../../Shared/Helpers/ChartColors'

type WeddingStyleCount = {
    style: string,
    count: number
};

export default class Casamentos extends Component {

    chartRef;
    chartEstilosRef;

    weddingService: WeddingService;
    weddings: WeddingModel[] = [];

    constructor(props) {
        super(props);

        this.weddingService = new WeddingService();
        this.weddings = this.weddingService.GetAll();

        this.chartRef = React.createRef();
        this.chartEstilosRef = React.createRef();
    }
    
    componentDidMount() {
        const lastMonths = DateHelper.GetLastMonthsObject(6, true);
        const weddingsPerMonth: any[] = [];
        let colorIndex = 0;

        lastMonths.forEach( x => {
            let weddingsMonth: WeddingModel[] = this.weddingService.GetByMonth( x.month, x.year );
            let weddingQuantity = weddingsMonth.length;
            const currentweddingMonth = {
                month: x.month,
                year: x.year,
                value: weddingQuantity
            }
            weddingsPerMonth.push( currentweddingMonth );       
        });
        

        const weddingChartData = weddingsPerMonth.map( x => x.value );
        console.log( weddingChartData );
        const chart = new Chart(this.chartRef.current, {
            type: 'line',
            data: {
                labels: lastMonths.map( x => { return x.monthName + '/' + x.year} ),
                datasets: [{
                    label: 'Casamentos Marcados',
                    data: weddingChartData,
                    borderColor: ChartColors[colorIndex++],
                    backgroundColor: 'transparent'
                }
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            }
        });

        this.setupChartEstilos();
    }

    setupChartEstilos() {
        let colorIndex = 0;
        const weddingStyles: WeddingStyleCount[] = [];
        this.weddings.forEach( wedding => {
            const foundIndex = weddingStyles.findIndex( x => x.style === wedding.Style );
            if( foundIndex > -1 ) {
                weddingStyles[foundIndex].count++;
            } else {
                weddingStyles.push({
                    count: 1,
                    style: wedding.Style
                });
            }
        })
        console.log( weddingStyles );
        const dataset: Chart.ChartDataSets[] = [{
            data: weddingStyles.map( x => x.count ),
            backgroundColor: [ ChartColors[colorIndex++], ChartColors[colorIndex++], ChartColors[colorIndex++] ]
        }]

        const chartEstilos = new Chart(this.chartEstilosRef.current, {
            type: 'doughnut',
            data: {
                labels: weddingStyles.map( x => x.style ),
                datasets: dataset
            },
            options: {
            }
        });
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
                <div className="columns cols-4">
                    <Box title='Gráfico de casamentos' customStyle={{ gridColumn: '1 / span 3' }}>
                        <canvas ref={this.chartRef} style={{ width: '100%', height: '100%', minHeight: '20vh' }}></canvas>
                    </Box>

                    <Box title='Gráfico de estilos'>
                        <canvas ref={this.chartEstilosRef} style={{ width: '100%', height: '100%', minHeight: '20vh' }}></canvas>
                    </Box>
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
