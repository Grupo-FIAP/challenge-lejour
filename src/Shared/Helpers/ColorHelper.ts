export default class ColorHelper {
    public static hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    public static hexToRgba( hex, opacity = 1.0, asStyleValue = false ): string | object {
        const rgb = this.hexToRgb( hex );
        if( asStyleValue ) {
            const strvalue = `rgba(${rgb?.r}, ${rgb?.g}, ${rgb?.b}, ${opacity})`;
            return strvalue;
        }

        return {
            r: rgb?.r,
            g: rgb?.g,
            b: rgb?.b,
            a: opacity
        };
    }
}