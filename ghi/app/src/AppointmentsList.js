import React from 'react';

export default function AppointmentsList(props) {

    const appointments = props.appointments;

    const handleCancel = async (id) => {

        const url = `http://localhost:8081/api/appointments/${id}/`;

        const updateStatus = {"status": "Canceled"}

        const fetchConfig = {
            method: "put",
            body:JSON.stringify(updateStatus),
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const response = await fetch(url, fetchConfig);
        if (!response.ok) {
            throw new Error ('Bad fetch response while updating Status');
        } else {

            window.location.href = "/appointments"
        }
    }

    const handleCompleted = async (id) => {

        const url = `http://localhost:8081/api/appointments/${id}/`;

        const updateStatus = {"status": "Completed"}

        const fetchConfig = {
            method: "put",
            body:JSON.stringify(updateStatus),
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const response = await fetch(url, fetchConfig);
        if (!response.ok) {
            throw new Error ('Bad fetch response while updating Status');
        } else {

            window.location.href = "/appointments"
        }
    }

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
                        <th>Status</th>
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
                                    <td>
                                        <div className="col-auto">
                                            <input onClick={() => handleCancel(appt.id)} className="btn btn-danger" type="button"  value="Cancel"/>
                                            <input onClick={() => handleCompleted(appt.id)} className="btn btn-primary" type="submit"  value="Completed"/>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                    })}
                </tbody>
            </table>
        </>
    )
}
