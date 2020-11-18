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

            let newUser: UserModel = new UserModel(
                x.ID,
                new Date(x.CREATED_AT),
                newName,
                newEmail,
                '00 90000-0000',
                spouseNewName
            );

            this.users.push( newUser );
        })

        this.users = this.users.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime();
          });
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
}