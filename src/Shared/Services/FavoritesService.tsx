import FavoritesData from '../../requests/users.json';

export class UserService {

    private favorites: any[];

    constructor() {
        this.favorites = FavoritesData;
    }

    GetCount() {
        return this.favorites.length;
    }

    GetLast10() {
        return this.favorites.slice( 0, 10 );
    }
}