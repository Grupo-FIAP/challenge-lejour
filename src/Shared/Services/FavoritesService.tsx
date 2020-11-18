import FavoritesData from '../../requests/users.json';

export class FavoritesService {

    private favorites: any[];

    constructor() {
        this.favorites = FavoritesData;
    }

    GetAll() {
        return this.favorites;
    }

    GetCount() {
        return this.favorites.length;
    }

    GetLast10() {
        return this.favorites.slice( 0, 10 );
    }
}