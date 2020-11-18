import UsersData from '../../requests/users.json';

export class UserService {

    private users: any[];

    constructor() {
        this.users = UsersData;
    }

    GetCount() {
        return this.users.length;
    }

    GetLast10() {
        return this.users.slice( 0, 10 );
    }
}