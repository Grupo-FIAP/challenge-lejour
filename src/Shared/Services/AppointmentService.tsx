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
                x.BEGINS_AT,
                x.CREATED_AT
            );

            return newAppointment;
        });
    }

    GetCount() {
        return this.appointment.length;
    }

    GetLast10() {
        return this.appointment.slice( 0, 10 );
    }
}