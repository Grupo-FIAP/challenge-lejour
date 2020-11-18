export default class NameGeneratorHelper {
    private static firstnamesM = ['João', 'Paulo', 'Pedro', 'José', 'André', 'Marcos', 'Joel', 'Mario', 'Angelo', 'Gerson'];
    private static firstnamesF = ['Joana', 'Paula', 'Maria', 'Madalena', 'Rita', 'Regina', 'Rose', 'Elisangela', 'Elise'];
    private static lastnames = ['da Silva', 'Santos', 'de Paula', 'Matos', 'Arruda', 'Batista', 'Souza', 'de Souza', 'Andrade'];

    public static GetRandomName( genre: 1 | 2 | null = null ) {
        let finalGenre = Math.floor( Math.random() * 2 );
        if( genre != null ) {
            finalGenre = genre;
        }

        let finalName = '';
        let namesArray: string[] = [];

        switch( genre ) {
            case 1:
                namesArray = this.firstnamesF;
                break;
            case 2:
                namesArray = this.firstnamesM;
                break;
        }

        const randomNameIndex = Math.floor( Math.random() * namesArray.length );
        finalName = namesArray[randomNameIndex];

        const randomLastNameIndex = Math.floor( Math.random() * this.lastnames.length );
        finalName += ' ' + this.lastnames[randomLastNameIndex];

        return finalName;
    }

    private static emailDomains = ['gmail.com', 'outlook.com', 'hotmail.com', 'live.com', 'yahoo.com']
    public static GetEmailFromName( name: string ) {
        let finalEmail = '';

        const emailDomain = this.emailDomains[ Math.random() * this.emailDomains.length ];
        finalEmail = name.trim().toLowerCase().replaceAll(' ', '') + '@' + emailDomain;
        
        return finalEmail;
    }
}