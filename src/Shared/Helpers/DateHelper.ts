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
}