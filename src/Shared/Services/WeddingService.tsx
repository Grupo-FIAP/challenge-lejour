import WeddingData from '../../requests/weddings.json';

export class WeddingService {

    private weddings: any[];

    constructor() {
        this.weddings = WeddingData;
    }

    GetCount() {
        return this.weddings.length;
    }

    GetLast10() {
        return this.weddings.slice( 0, 10 );
    }
}