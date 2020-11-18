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

            let newUser: UserModel = new UserModel(
                x.ID,
                x.CREATED_AT,
                newName,
                newEmail,
                '00 90000-0000'
            );
        })
    }

    GetCount() {
        return this.users.length;
    }

    GetLast10() {
        return this.users.slice( 0, 10 );
    }
}