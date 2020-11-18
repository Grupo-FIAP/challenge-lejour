export class FormatHelper {

    public static CurrencyFormat( value ) {
        return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
    }

    public static DateFormat( value: Date ) {
        return value.toLocaleDateString();
    }
}