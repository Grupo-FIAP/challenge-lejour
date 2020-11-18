import AppointmentData from '../../requests/appointments.json';
import { AppointmentModel } from '../Models/appointment';

export class AppointmentService {

    private appointment: AppointmentModel[];

    constructor() {
        const rawData = AppointmentData;
        this.appointment = rawData.map( x => {
            const newAppointment = new AppointmentModel(
                x.ID,
                x.WEDDING_ID,
                x.VENDOR_ID,
                x.STATUS,
                x.VENDOR_CATEGORY,
                new Date(x.BEGINS_AT),
                new Date(x.CREATED_AT)
            );

            return newAppointment;
        }).sort( (a, b) => b.CreatedAt.getTime() - a.CreatedAt.getTime());
    }

    GetCount() {
        return this.appointment.length;
    }

    GetLast10() {
        return this.appointment.slice( 0, 10 );
    }

    GetByMonth( month, year ) {
        const appointmentsByMonth = this.appointment.filter(
            x => x.CreatedAt.getMonth() === month 
                && x.CreatedAt.getFullYear() === year
                && x.Status === "CONFIRMED"
        );

        return appointmentsByMonth;
    }
}