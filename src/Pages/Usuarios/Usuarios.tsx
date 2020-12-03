import React, { Component } from 'react'
import Box from '../../Components/Layout/Box'
import DashboardViewport from '../../Components/Layout/DashboardViewport'
import MetricOverview from '../../Components/Layout/MetricOverview'
import { UserService } from '../../Shared/Services/UserService'
import IconeNoivos from '../../assets/icons/icone_noivos.svg';
import { DateHelper } from '../../Shared/Helpers/DateHelper'
import { UserModel } from '../../Shared/Models/user'
import Chart from 'chart.js'
import ChartColors from '../../Shared/Helpers/ChartColors'

type userTrafficOrigin = {
    origin: string,
    count: number
};

export default class Usuarios extends Component {

    chartRef;
    chartEstilosRef;

    usersService;
    users;

    constructor( props ) {
        super(props);
        this.usersService = new UserService();
        this.users = this.usersService.GetAll();

        this.chartEstilosRef = React.createRef();
        this.chartRef = React.createRef();
    }

    componentDidMount() {
        const lastMonths = DateHelper.GetLastMonthsObject(6, true);
        const usersPerMonth: any[] = [];
        let colorIndex = 0;

        lastMonths.forEach( x => {
            let usersMonth: UserModel[] = this.usersService.GetByMonth( x.month, x.year );
            let uerQuantity = usersMonth.length;
            const currentUsersMonth = {
                month: x.month,
                year: x.year,
                value: uerQuantity
            }
            usersPerMonth.push( currentUsersMonth );       
        });
        

        const usersChartData = usersPerMonth.map( x => x.value );
        console.log( usersChartData );
        const chart = new Chart(this.chartRef.current, {
            type: 'line',
            data: {
                labels: lastMonths.map( x => { return x.monthName + '/' + x.year} ),
                datasets: [{
                    label: 'Casamentos Marcados',
                    data: usersChartData,
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
        const userOrigin: userTrafficOrigin[] = [];
        this.users.forEach( (user: UserModel) => {
            const foundIndex = userOrigin.findIndex( x => x.origin === user.Origem );
            if( foundIndex > -1 ) {
                userOrigin[foundIndex].count++;
            } else {
                userOrigin.push({
                    count: 1,
                    origin: user.Origem
                });
            }
        })
        console.log( userOrigin );
        const dataset: Chart.ChartDataSets[] = [{
            data: userOrigin.map( x => x.count ),
            backgroundColor: [ ChartColors[colorIndex++], ChartColors[colorIndex++], ChartColors[colorIndex++], ChartColors[colorIndex++] ]
        }]

        const chartEstilos = new Chart(this.chartEstilosRef.current, {
            type: 'doughnut',
            data: {
                labels: userOrigin.map( x => x.origin ),
                datasets: dataset
            },
            options: {
            }
        });
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

                <div className="columns cols-4">
                    <Box title='Gráfico de usuários' customStyle={{ gridColumn: '1 / span 3' }}>
                        <canvas ref={this.chartRef} style={{ width: '100%', height: '100%', minHeight: '20vh' }}></canvas>
                    </Box>

                    <Box title='Gráfico de trafego'>
                        <canvas ref={this.chartEstilosRef} style={{ width: '100%', height: '100%', minHeight: '20vh' }}></canvas>
                    </Box>
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
