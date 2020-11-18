export class AppointmentModel {
    constructor(
        public Id,
        public WeddingId,
        public VendorId,
        public Status,
        public VendorCategory,
        public BeginsAt,
        public CreatedAt
    ) {
    }
}