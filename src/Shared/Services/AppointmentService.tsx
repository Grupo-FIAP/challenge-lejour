import AppointmentData from '../../requests/appointments.json';

export class AppointmentService {

    private appointment: any[];

    constructor() {
        this.appointment = AppointmentData;
    }

    GetCount() {
        return this.appointment.length;
    }

    GetLast10() {
        return this.appointment.slice( 0, 10 );
    }
}