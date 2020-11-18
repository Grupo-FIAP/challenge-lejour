import React, { Component } from 'react'
import Box from '../../Components/Layout/Box'
import DashboardViewport from '../../Components/Layout/DashboardViewport'
import MetricOverview from '../../Components/Layout/MetricOverview'
import { FormatHelper } from '../../Shared/Helpers/FormatHelper'
import { InvoiceService } from '../../Shared/Services/InvoiceService'
import Chart from 'chart.js';

import IconeOrcamento from '../../assets/icons/icone_orcamento.svg';
import { DateHelper } from '../../Shared/Helpers/DateHelper'
import { InvoiceModel } from '../../Shared/Models/invoice'
import ChartColors from '../../Shared/Helpers/ChartColors'

export default class Vendas extends Component {

    invoiceService: InvoiceService;
    invoices: InvoiceModel[] = [];

    invoiceTotal = 0;
    invoiceTotalThisMonth = 0;
    invoiceTotalLast6Months = 0;
    invoiceTotalLast12Months = 0;

    invoicesLast12Months;
    last12Months;

    chartRef;

    constructor(props) {
        super(props);
        this.invoiceService = new InvoiceService();
        this.chartRef = React.createRef();
        this.invoices = this.invoiceService.GetAll();
    }

    setupData() {
        this.invoiceTotal = this.invoiceService.GetTotalAmount();
        let invoicesThisMonth = this.invoiceService.GetByMonth(new Date().getMonth(), new Date().getFullYear());
        invoicesThisMonth.forEach(x => {
            this.invoiceTotalThisMonth += x.Amount;
        });

        const invoicePer6Month: any[] = []
        const last6Months = DateHelper.GetLastMonthsObject(6, true);
        last6Months.forEach(x => {
            let invoicesMonth: InvoiceModel[] = [];
            let valueThisMonth = 0;

            invoicesMonth = this.invoiceService.GetByMonth(x.month, x.year);
            let invoicesQuantity = invoicesMonth.length;
            invoicesMonth.forEach(x => {
                valueThisMonth += x.Amount;
            });

            const currentInvoiceMonth = {
                month: x.month,
                year: x.year,
                value: valueThisMonth,
                quantity: invoicesQuantity
            };

            invoicePer6Month.push(currentInvoiceMonth);
        });
        invoicePer6Month.forEach(x => {
            this.invoiceTotalLast6Months += x.value;
        })

        const invoicePer12Month: any[] = [];
        const last12Months = DateHelper.GetLastMonthsObject(12, true);
        last12Months.forEach(x => {
            let invoicesMonth: InvoiceModel[] = [];
            let valueThisMonth = 0;
            let valueVendorThisMonth = 0;

            invoicesMonth = this.invoiceService.GetByMonth(x.month, x.year);
            let invoicesQuantity = invoicesMonth.length;
            invoicesMonth.forEach(x => {
                valueThisMonth += x.Amount;
                valueVendorThisMonth += x.VendorAmount;
            });

            const currentInvoiceMonth = {
                month: x.month,
                year: x.year,
                value: valueThisMonth,
                valueVendor: valueVendorThisMonth,
                quantity: invoicesQuantity
            };

            invoicePer12Month.push(currentInvoiceMonth);
        });
        this.invoicesLast12Months = invoicePer12Month;
        invoicePer12Month.forEach(x => {
            this.invoiceTotalLast12Months += x.value;
        })

        this.last12Months = last12Months;
    }

    componentDidMount() {
        let colorIndex = 0;

        let invoicesChartData = this.invoicesLast12Months.map(x => {
            return x.value;
        });

        let vendorChartData = this.invoicesLast12Months.map(x => {
            return x.valueVendor;
        });

        const chart = new Chart(this.chartRef.current, {
            type: 'bar',
            data: {
                labels: this.last12Months.map(x => { return x.monthName + '/' + x.year }),
                datasets: [
                    {
                        label: 'Faturamento',
                        data: invoicesChartData,
                        backgroundColor: ChartColors[colorIndex++]
                    },
                    {
                        label: 'Pagamento para fornecedores',
                        data: vendorChartData,
                        backgroundColor: ChartColors[colorIndex++]
                    },
                ],
            },
            options: {
            }
        });
    }

    renderLastInvoices() {

        return this.invoices.map((invoice: InvoiceModel) => {
            const { Id, WeddingId, Accepted, CreatedAt, Amount, VendorAmount, VendorCategory, VendorId } = invoice;

            return (
                <tr>
                    <td>{Id}</td>
                    <td>{CreatedAt.toLocaleDateString()}</td>
                    <td>{FormatHelper.CurrencyFormat(Amount)}</td>
                    <td>{FormatHelper.CurrencyFormat(VendorAmount)}</td>
                    <td>{VendorCategory}</td>
                    <td>{VendorId}</td>
                    <td>{WeddingId}</td>
                </tr>
            )
        });
    }

    render() {
        this.setupData();

        return (
            <DashboardViewport title="Vendas">

                <div className="columns cols-4">
                    <MetricOverview icon={IconeOrcamento} data={{ stat: FormatHelper.CurrencyFormat(this.invoiceTotal), about: 'Em vendas total' }} name='usuários'></MetricOverview>
                    <MetricOverview icon={IconeOrcamento} data={{ stat: FormatHelper.CurrencyFormat(this.invoiceTotalThisMonth), about: 'Faturamento em Novembro' }} name='casamentos'></MetricOverview>
                    <MetricOverview icon={IconeOrcamento} data={{ stat: FormatHelper.CurrencyFormat(this.invoiceTotalLast6Months), about: 'Faturamento nos últimos 6 meses' }} name='Faturamento nos últimos 6 meses'></MetricOverview>
                    <MetricOverview icon={IconeOrcamento} data={{ stat: FormatHelper.CurrencyFormat(this.invoiceTotalLast12Months), about: 'Faturamento nos últimos 12 meses' }} name='Faturamento'></MetricOverview>
                </div>

                <div className="columns cols-2">
                    <Box customStyle={{ gridColumn: '1 / span 2' }} title='Gráfico de faturamento mensal (12 meses)' transparent>
                        <canvas ref={this.chartRef} style={{ width: '100%', height: '100%', minHeight: '40vh' }}></canvas>
                    </Box>
                </div>

                <div className="columns cols-2">
                    <Box customStyle={{ gridColumn: '1 / span 2' }} title='Faturamentos'>
                    <div className="field">
                            <label htmlFor="" className="label">Pesquisar Faturamento</label>
                            <div className="control">
                                <input type="text" className="input" placeholder="Faça a sua pesquisa"/>
                            </div>
                            <sub>A pesquisa será feita em todos os campos de faturamento</sub>
                        </div>
                        <div className="scroll-box">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Data</th>
                                        <th>Valor</th>
                                        <th>Valor (Fornecedor)</th>
                                        <th>Categoria</th>
                                        <th>Fornecedor</th>
                                        <th>Casamento</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderLastInvoices()}
                                </tbody>
                            </table>
                        </div>
                    </Box>
                </div>
            </DashboardViewport>
        )
    }
}
