import UsersData from '../../requests/users.json';
import NameGeneratorHelper from '../Helpers/NameGeneratorHelper';
import { UserModel } from '../Models/user';

export class UserService {

    private users: UserModel[] = [];

    constructor() {
        let rawUsers = UsersData;
        rawUsers.forEach( x => {
            const newName = NameGeneratorHelper.GetRandomName();
            const newEmail = NameGeneratorHelper.GetEmailFromName( newName );

            const spouseNewName = NameGeneratorHelper.GetRandomName();
            const origens = ['Google adwords', 'Facebook Ads', 'Organico', 'Indicação'];

            let newUser: UserModel = new UserModel(
                x.ID,
                new Date(x.CREATED_AT),
                newName,
                newEmail,
                '00 90000-0000',
                spouseNewName,
                origens[ Math.floor( Math.random() * origens.length )]
            );

            this.users.push( newUser );
        })

        this.users = this.users.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime();
          });
    }

    GetAll() {
        return this.users;
    }

    GetById( id ) {
        return this.users.find( x => x.Id === id );
    }

    GetCount() {
        return this.users.length;
    }

    GetLast10() {
        return this.users.slice( 0, 10 );
    }

    GetByMonth( month, year ) {
        const usersByMonth = this.users.filter(
            x => x.CreatedAt.getMonth() === month 
                && x.CreatedAt.getFullYear() === year
        );

        return usersByMonth;
    }
}