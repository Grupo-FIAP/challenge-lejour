export class DateHelper {
    public static monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ];

    public static GetLastMonths( quantity, includeCurrent: boolean = false ) {
        const months: string[] = [];
        const today = new Date();
        let month;

        for( let i = quantity; i > 0; i-- ) {

            const nextValue = () => {
                if( includeCurrent ) {
                    return i+1;
                }
                return i;
            };

            const d = new Date(today.getFullYear(), today.getMonth() - nextValue(), 1);
            month = this.monthNames[d.getMonth()];
            months.push( month );
        }

        return months;
    }

    public static GetLastMonthsObject(quantity, includeCurrent: boolean = false) {
        const months: any[] = [];
        const today = new Date();
        let monthNum = new Date().getMonth();
        let year = new Date().getFullYear();

        for( let i = 0; i < quantity; i++ ) {
            let newMonth = {
                month: 0,
                year: year,
                monthName: ''
            }

            const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
            newMonth.monthName = this.monthNames[d.getMonth()];
            newMonth.month = monthNum;

            monthNum--;

            if( monthNum < 0 ) {
                monthNum = 11;
                year--;
            }

            months.push( newMonth );
        }
        return months.reverse();
    }
}