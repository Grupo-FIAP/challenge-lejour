import { UserService } from "../Services/UserService";
import { UserModel } from "./user";

export class WeddingModel {
    public Couple;

    constructor(
        public Id,
        public OwnerId,
        public Budget,
        public WeddingDate: Date,
        public NumberOfGuests,
        public Style,
    ){
    }

    public GetCoupleName( usersList = null ) {
        let coupleName;

        // if( usersList == null ) {
            let usersService: UserService = new UserService();
            let user = usersService.GetById( this.Id );
            coupleName = user?.Name.split( ' ' )[0] + " & " + user?.SpouseName.split( ' ' )[0];
        // }

        return coupleName;
    }
}