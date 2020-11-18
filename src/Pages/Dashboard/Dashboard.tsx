import React, { Component, createRef, Ref, RefObject } from 'react'
import { Link } from 'react-router-dom';

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
import { UserService } from '../../Shared/Services/UserService';
import { WeddingService } from '../../Shared/Services/WeddingService';
import { InvoiceService } from '../../Shared/Services/InvoiceService';
import { FavoritesService } from '../../Shared/Services/FavoritesService';
import { AppointmentService } from '../../Shared/Services/AppointmentService';
import { UserModel } from '../../Shared/Models/user';
import DashboardViewport from '../../Components/Layout/DashboardViewport';

export default class Dashboard extends Component {

    chartRef;

    // Referente a usuários
    userService: UserService;
    totalUsers: number = 0;
    last10Users: UserModel[] = [];

    // Referente a casamentos
    weddingService: WeddingService;
    totalWeddings;

    // Referente a invoice
    invoiceService: InvoiceService;
    totalInvoices;

    // Referente a favoritos
    favoritesService: FavoritesService;
    totalFavorites;

    // Referente a agendamentos
    appointmentService: AppointmentService;
    totalAppointments;


    constructor(props) {
        super(props);

        this.chartRef = React.createRef();

        this.userService = new UserService();
        this.weddingService = new WeddingService();
        this.invoiceService = new InvoiceService();
        this.favoritesService = new FavoritesService();
        this.appointmentService = new AppointmentService();
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
                        // borderColor: ChartColors[colorIndex],
                        borderColor: ChartColors[colorIndex++],
                        // backgroundColor: ColorHelper.hexToRgba( ChartColors[colorIndex++], 0.2, true ).toString(),
                        backgroundColor: 'transparent'
                    },{
                        label: 'Usuários',
                        data: randomNumbers( 6, 150, 10 ),
                        // borderColor: ChartColors[colorIndex],
                        borderColor: ChartColors[colorIndex++],
                        // backgroundColor: ColorHelper.hexToRgba( ChartColors[colorIndex++], 0.2, true ).toString(),
                        backgroundColor: 'transparent'
                    },{
                        label: 'Fornecedores',
                        data: randomNumbers( 6, 150, 10 ),
                        // borderColor: ChartColors[colorIndex],
                        borderColor: ChartColors[colorIndex++],
                        // backgroundColor: ColorHelper.hexToRgba( ChartColors[colorIndex++], 0.2, true ).toString(),
                        backgroundColor: 'transparent'
                    },{
                        label: 'Vendas',
                        data: randomNumbers( 6, 150, 10 ),
                        // borderColor: ChartColors[colorIndex],
                        borderColor: ChartColors[colorIndex++],
                        // backgroundColor: ColorHelper.hexToRgba( ChartColors[colorIndex++], 0.2, true ).toString(),
                        backgroundColor: 'transparent'
                    }
                ],
            },
            options: {
            }
        } );

        
    }

    /**
     * Funções referentes a usuários
     */
    setupUsersData() {
        this.totalUsers = this.userService.GetCount();
        this.last10Users = this.userService.GetLast10();

        console.log( this.last10Users );
    }

    renderLastUsers() {
        let html;

        // <thead>
        //     <tr>
        //         <th>#</th>
        //         <th>Nome</th>
        //         <th>E-mail</th>
        //         <th>Telefone</th>
        //         <th>Origem</th>
        //     </tr>
        // </thead>

        // this.last10Users.forEach(x => {
        //     html += <tr>
        //         <td>{x.Id}</td>
        //         <td>{x.Name}</td>
        //         <td>{x.Username}</td>
        //         <td>{x.Phone}</td>
        //         <td>{x.CreatedAt}</td>
        //     </tr>

        // });
        return this.last10Users.map( user => {
            const { Id, Name, Username, CreatedAt, Phone } = user;

            return (
                <tr>
                    <td>{Id}</td>
                    <td>{Name}</td>
                    <td>{Username}</td>
                    <td>{Phone}</td>
                    <td>{CreatedAt}</td>
                </tr>
            )
        });
    }

    setupWeddingsData() {
        this.totalWeddings = this.weddingService.GetCount();
    }

    setupInvoicesData() {
        this.totalInvoices = this.invoiceService.GetTotalAmount();
    }

    setupAppointmentsData() {
        this.totalAppointments = this.appointmentService.GetCount();
    }

    setupFavoritesData() {
        this.totalFavorites = this.favoritesService.GetCount();
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

        this.setupUsersData();
        this.setupWeddingsData();
        this.setupInvoicesData();
        this.setupAppointmentsData();
        this.setupFavoritesData();

        return (

            <DashboardViewport title="Visão Geral">
                    <div className="columns cols-4">
                        <MetricOverview data={{ stat: 'R$ ' + this.totalInvoices.toFixed(2), about: 'Vendas Feitas' }} icon={IconeOrcamento} name='Vendas' link='/vendas'></MetricOverview>
                        <MetricOverview data={{ stat: this.totalWeddings, about: 'Casamentos Realizados' }} icon={IconeCerimonia} name='casamentos' link='/casamentos'></MetricOverview>
                        <MetricOverview data={{ stat: this.totalUsers, about: 'Usuários Cadastrados' }} icon={IconeNoivos} name='usuários' link='/usuarios'></MetricOverview>
                        <MetricOverview data={{ stat: 58, about: 'Fornecedores Cadastrados' }} icon={IconeFornecedores} name='fornecedores' link='/fornecedores'></MetricOverview>
                    </div>
                    
                    <div className="columns cols-3">
                        <Box transparent title='Gráfico de acompanhamento de desempenho' customStyle={{ gridColumn: "1 / span 2", maxHeight: '400px' }} >
                            <canvas ref={ this.chartRef } style={{ width: '100%', height: '100%', minHeight: '40vh'  }}></canvas>
                        </Box>
                        <Box title='Metas' transparent>
                            <h4>Metas de 2020</h4>
                            <GoalBar goalName='Faturamento total' goal={3000000} goalCurrent={ this.totalInvoices } isCurrency={{ digits: 2, preffix: 'R$' }} ></GoalBar>
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
                                    { this.renderLastUsers() }
                                </tbody>
                            </table>
                            <div className="spacer-3"></div>
                            <div className="has-text-right">
                                <Link to='/usuarios'>
                                    <button className="button is-primary">Ver todos os dados de usuários</button>
                                </Link>
                            </div>
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
            </DashboardViewport>
        )
    }
}
