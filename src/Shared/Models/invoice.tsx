export class InvoiceModel {
    

    constructor(
        public Accepted: boolean,
        public Amount: number,
        public CreatedAt: Date,
        public Id: number,
        public VendorAmount: number,
        public VendorCategory,
        public VendorId,
        public WeddingId,
    ) {}
}