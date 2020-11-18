import WeddingData from '../../requests/weddings.json';
import { WeddingModel } from '../Models/wedding';

export class WeddingService {

    private weddings: WeddingModel[];

    constructor() {
        this.weddings = WeddingData.map( x=> {
            return new WeddingModel(
                x.ID,
                x.OWNER_ID,
                x.BUDGET,
                new Date(x.WEDDING_DATE),
                x.NUMBER_OF_GUESTS,
                x.STYLE
            )
        }).sort((a, b) => b.WeddingDate.getTime() - a.WeddingDate.getTime());
    }

    GetAll() {
        return this.weddings;
    }

    GetById() {
        
    }

    GetCount() {
        return this.weddings.length;
    }

    GetLast10() {
        return this.weddings.slice( 0, 10 );
    }

    GetByMonth( month, year ) {
        const weddingsByMonth = this.weddings.filter(
            x => x.WeddingDate.getMonth() === month
                && x.WeddingDate.getFullYear() === year
        );

        return weddingsByMonth;
    }
}