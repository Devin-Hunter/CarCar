import React from 'react';

const ServiceHistory = (props) => {

    const appointments = props.appointments;

    const handleSearch = (event) => {

    }

    return (
    <>
        <h1>Service History</h1>
        <form onSubmit={handleSearch} id="search-vin-form" className="row g-3">
            <div className='col-auto'>

            <input className="form-control" list="datalistOptions" id="exampleDataList" placeholder="Vin search..." />
                <datalist id="datalistOptions">
                    {appointments.map(appt => {
                        return (
                            <option key={appt.id} value={appt.vin}>{appt.vin}</option>
                        )
                    })}
                </datalist>
            </div>
        </form>
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
                return (
                    <tr key={appt.id}>
                        <td>{ appt.vin }</td>
                        <td>{ appt.customer }</td>
                        <td>No</td>
                        <td>{ new Date(appt.date_time).toDateString() }</td>
                        <td>{ new Date(appt.date_time).toTimeString().substring(0, 5) }</td>
                        <td>{ appt.technician.first_name } { appt.technician.last_name }</td>
                        <td>{ appt.reason }</td>
                        <td>{ appt.status }</td>
                    </tr>
                )})}
            </tbody>
        </table>
    </>
    )
}

export default ServiceHistory
