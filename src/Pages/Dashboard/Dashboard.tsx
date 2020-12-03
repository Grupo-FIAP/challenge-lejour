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
import { WeddingModel } from '../../Shared/Models/wedding';
import { AppointmentModel } from '../../Shared/Models/appointment';
import { InvoiceModel } from '../../Shared/Models/invoice';
import { FormatHelper } from '../../Shared/Helpers/FormatHelper';
import ChartOptions from '../../Shared/Helpers/ChartOptions';

export default class Dashboard extends Component {

    chartRef;

    // Referente a usuários
    userService: UserService;
    totalUsers: number = 0;
    last10Users: UserModel[] = [];

    // Referente a casamentos
    weddingService: WeddingService;
    totalWeddings;
    nextWeddings;

    // Referente a invoice
    invoiceService: InvoiceService;
    totalInvoices;
    lastInvoices: InvoiceModel[] = [];

    // Referente a favoritos
    favoritesService: FavoritesService;
    totalFavorites;

    // Referente a agendamentos
    appointmentService: AppointmentService;
    totalAppointments: number = 0;
    nextAppointments: AppointmentModel[] = [];


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
        const lastMonths = DateHelper.GetLastMonthsObject(6, true);

        let colorIndex = 0;

        const invoicePerMonth: any[] = [];
        const usersPerMonth: any[] = [];
        const appointmentsPerMonth: any[] = [];
        const weddingsPerMonth: any[] = [];

        lastMonths.forEach( x => {
            let invoicesMonth:InvoiceModel[] = [];
            let valueThisMonth = 0;

            invoicesMonth = this.invoiceService.GetByMonth( x.month, x.year );
            let invoicesQuantity = invoicesMonth.length;
            invoicesMonth.forEach( x => {
                valueThisMonth += x.Amount;
            });

            const currentInvoiceMonth = {
                month: x.month,
                year: x.year,
                value: valueThisMonth,
                quantity: invoicesQuantity
            };
            
            invoicePerMonth.push( currentInvoiceMonth );

            // users
            let usersMonth: UserModel[] = this.userService.GetByMonth( x.month, x.year );
            let userQuantity = usersMonth.length;
            const currentUserMonth = {
                month: x.month,
                year: x.year,
                value: userQuantity
            }
            usersPerMonth.push( currentUserMonth );

            // appointments
            let appointmentsMonth: AppointmentModel[] = this.appointmentService.GetByMonth( x.month, x.year );
            let appointmentQuantity = appointmentsMonth.length;
            const currentappointmentMonth = {
                month: x.month,
                year: x.year,
                value: appointmentQuantity
            }
            appointmentsPerMonth.push( currentappointmentMonth );

            // weddings
            let weddingsMonth: WeddingModel[] = this.weddingService.GetByMonth( x.month, x.year );
            let weddingQuantity = weddingsMonth.length;
            const currentweddingMonth = {
                month: x.month,
                year: x.year,
                value: weddingQuantity
            }
            weddingsPerMonth.push( currentweddingMonth );
        });

        console.log( usersPerMonth );

        const invoiceChartData = invoicePerMonth.map( x => x.quantity );
        const usersChartData = usersPerMonth.map( x => x.value );
        const appointmentChartData = appointmentsPerMonth.map( x => x.value );
        const weddingChartData = weddingsPerMonth.map( x => x.value );
        

        const chart = new Chart(this.chartRef.current, {
            type: 'line',
            data: {
                labels: lastMonths.map( x => { return x.monthName + '/' + x.year} ),
                datasets: [{
                    label: 'Casamentos Realizados',
                    data: weddingChartData,
                    borderColor: ChartColors[colorIndex++],
                    backgroundColor: 'transparent'
                }, {
                    label: 'Usuários Cadastrados',
                    data: usersChartData,
                    borderColor: ChartColors[colorIndex++],
                    backgroundColor: 'transparent'
                }, {
                    label: 'Agendamentos finalizados',
                    data: appointmentChartData,
                    borderColor: ChartColors[colorIndex++],
                    backgroundColor: 'transparent'
                }, {
                    label: 'Faturamentos concretizados',
                    data: invoiceChartData,
                    borderColor: ChartColors[colorIndex++],
                    backgroundColor: 'transparent'
                }
                ],
            },
            options: ChartOptions
        });


    }

    /**
     * Funções referentes a usuários
     */
    setupUsersData() {
        this.totalUsers = this.userService.GetCount();
        this.last10Users = this.userService.GetLast10();
    }

    renderLastUsers() {
        return this.last10Users.map(user => {
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

    /**
     * Referente a casamentos
     */
    setupWeddingsData() {
        this.totalWeddings = this.weddingService.GetCount();
        this.nextWeddings = this.weddingService.GetLast10();
    }

    renderNextWeddings() {
        return this.nextWeddings.map((wedding: WeddingModel) => {
            const { Id, WeddingDate, Style, OwnerId } = wedding;

            return (
                <tr>
                    <td>{Id}</td>
                    <td>{WeddingDate.toLocaleDateString()}</td>
                    <td>{wedding.GetCoupleName()}</td>
                    <td>{Style}</td>
                    <td>{OwnerId}</td>
                </tr>
            )
        });
    }


    /**
     * Referente a invoices
     */
    setupInvoicesData() {
        this.totalInvoices = this.invoiceService.GetTotalAmount();
        this.lastInvoices = this.invoiceService.GetLast10();
    }

    renderLastInvoices() {

        return this.lastInvoices.map( (invoice: InvoiceModel) => {
            const { Id, WeddingId, Accepted, CreatedAt, Amount, VendorAmount, VendorCategory  } = invoice;

            return (
                <tr>
                    <td>{Id}</td>
                    <td>{CreatedAt.toLocaleDateString()}</td>
                    <td>{FormatHelper.CurrencyFormat(Amount)}</td>
                    <td>{FormatHelper.CurrencyFormat(VendorAmount)}</td>
                    <td>{VendorCategory}</td>
                    <td>{WeddingId}</td>
                </tr>
            )
        });
    }

    /**
     * Referentes a agendamentos
     */
    setupAppointmentsData() {
        this.totalAppointments = this.appointmentService.GetCount();
        this.nextAppointments = this.appointmentService.GetLast10();
    }

    renderNextAppointments() {
        return this.nextAppointments.map(appointment => {
            const { Id, CreatedAt, Status, BeginsAt, WeddingId } = appointment;

            return (
                <tr>
                    <td>{Id}</td>
                    <td>{BeginsAt.toLocaleDateString()}</td>
                    <td>{WeddingId}</td>
                    <td>{Status}</td>
                </tr>
            )
        });
    }

    /**
     * Referente a favoritos
     */
    setupFavoritesData() {
        this.totalFavorites = this.favoritesService.GetCount();
    }

    render() {
        const rnd = (range, minimum = 0, round = true) => {
            let result: number = minimum;
            result += Math.random() * range

            if (round) {
                result = Math.round(result);
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
                    <MetricOverview data={{ stat: FormatHelper.CurrencyFormat(this.totalInvoices), about: 'em Vendas Totais' }} icon={IconeOrcamento} name='Vendas' link='/vendas'></MetricOverview>
                    <MetricOverview data={{ stat: this.totalWeddings, about: 'Casamentos Realizados' }} icon={IconeCerimonia} name='casamentos' link='/casamentos'></MetricOverview>
                    <MetricOverview data={{ stat: this.totalUsers, about: 'Usuários Cadastrados' }} icon={IconeNoivos} name='usuários' link='/usuarios'></MetricOverview>
                    <MetricOverview data={{ stat: 58, about: 'Fornecedores Cadastrados' }} icon={IconeFornecedores} name='fornecedores' link='/fornecedores'></MetricOverview>
                </div>

                <div className="columns cols-3">
                    <Box transparent title='Gráfico de acompanhamento de desempenho' customStyle={{ gridColumn: "1 / span 2", maxHeight: '400px' }} >
                        <canvas ref={this.chartRef} style={{ width: '100%', height: '100%', minHeight: '40vh' }}></canvas>
                    </Box>
                    <Box title='Metas' transparent>
                        <h4>Metas de 2020</h4>
                        <GoalBar goalName='Faturamento total' goal={3000000} goalCurrent={this.totalInvoices} isCurrency={{ digits: 2, preffix: 'R$' }} ></GoalBar>
                        <div className="spacer-1"></div>
                        <h4>Metas de Dezembro</h4>
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
                                    <th>Data</th>
                                    <th>Nome</th>
                                    <th>E-mail</th>
                                    <th>Telefone</th>
                                    <th>Origem</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderLastUsers()}
                            </tbody>
                        </table>
                        <div className="spacer-3"></div>
                        <div className="has-text-right">
                            <Link to='/usuarios'>
                                <button className="button is-secondary button-rounded">Ver todos os dados de Usuários</button>
                            </Link>
                        </div>
                    </Box>
                    <Box title='Casamentos próximos' customStyle={{ gridColumn: "3 / span 2" }}>
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
                        <div className="spacer-3"></div>
                        <div className="has-text-right">
                            <Link to='/casamentos'>
                                <button className="button is-secondary button-rounded">Ver todos os dados de Casamentos</button>
                            </Link>
                        </div>
                    </Box>
                </div>

                <div className="columns cols-2">
                    <Box title='Agendamentos próximos'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Data</th>
                                    <th>Casal</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderNextAppointments()}
                            </tbody>
                        </table>
                        <div className="spacer-3"></div>
                        <div className="has-text-right">
                            <Link to='/agendamentos'>
                                <button className="button is-secondary button-rounded">Ver todos os dados de Agendamentos</button>
                            </Link>
                        </div>
                    </Box>
                    <Box title='Faturas recentes'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Data</th>
                                    <th>Valor Total</th>
                                    <th>Valor do Fornecedor</th>
                                    <th>Categoria</th>
                                    <th>Casamento</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderLastInvoices()}
                            </tbody>
                        </table>
                        <div className="spacer-3"></div>
                        <div className="has-text-right">
                            <Link to='/vendas'>
                                <button className="button is-secondary button-rounded">Ver todos os dados de Vendas</button>
                            </Link>
                        </div>
                    </Box>
                </div>
            </DashboardViewport>
        )
    }
}
