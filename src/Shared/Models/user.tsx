export class UserModel {
    constructor(
        public Id,
        public CreatedAt: Date,
        public Name,
        public Username,
        public Phone,
        public SpouseName
    ){}
}