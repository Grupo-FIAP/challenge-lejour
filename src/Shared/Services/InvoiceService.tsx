import InvoicesData from '../../requests/invoices.json';

export class UserService {

    private invoices: any[];

    constructor() {
        this.invoices = InvoicesData;
    }

    GetCount() {
        return this.invoices.length;
    }

    GetLast10() {
        return this.invoices.slice( 0, 10 );
    }
}