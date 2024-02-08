import React from 'react';

export default function AppointmentsList(props) {

    const appointments = props.appointments

    return (
        <>
            <h1>Service Appointments</h1>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Customer</th>
                        <th>VIP</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Technician</th>
                        <th>Reason</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(appt => {
                        if (appt.status === "Scheduled") {
                            return (
                                <tr key={appt.id}>
                                    <td>{ appt.vin }</td>
                                    <td>{ appt.customer }</td>
                                    <td>No</td>
                                    <td>{ new Date(appt.date_time).toDateString() }</td>
                                    <td>{ new Date(appt.date_time).toTimeString().substring(0, 5) }</td>
                                    <td>{ appt.technician.first_name } { appt.technician.last_name }</td>
                                    <td>{ appt.reason }</td>
                                </tr>
                            )
                        }
                    })}
                </tbody>
            </table>
        </>
    )
}
