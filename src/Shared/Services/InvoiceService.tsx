import InvoicesData from '../../requests/invoices.json';
import { InvoiceModel } from '../Models/invoice';

export class InvoiceService {

    private invoices: InvoiceModel[];

    constructor() {
        let rawInvoices = InvoicesData;
        this.invoices = rawInvoices.map( x  => {
            let newInvoice: InvoiceModel = new InvoiceModel(
                x.ACCEPTED == 'TRUE',
                x.AMOUNT,
                x.CREATED_AT,
                x.ID,
                x.VENDOR_AMOUNT,
                x.VENDOR_CATEGORY,
                x.VENDOR_ID,
                x.WEDDING_ID
            );

            return newInvoice;
        });
    }
    
    GetTotalAmount() {
        let totalValue = 0;
        this.invoices.forEach( (x : InvoiceModel) => {
            if( x.Accepted ) {
                totalValue += x.Amount;
            }
        })

        return totalValue;
    }

    GetCount() {
        return this.invoices.length;
    }

    GetLast10() {
        return this.invoices.slice( 0, 10 );
    }
}