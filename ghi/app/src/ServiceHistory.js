import React, {useState} from 'react';

const ServiceHistory = (props) => {

    const [search, setSearch] = useState('');

    const appointments = props.appointments;
    const cars = props.car;

    const soldCars = cars.map(car => {

        if (car.sold === true) {
            return car.vin
        }
    })


    const handleSearch = (event) => {
        event.preventDefault();
        const value = event.target.value;
        setSearch(value);
    }



    const handleVIP = (vin) => {

        if (soldCars.includes(vin)) {
            return "Yes"
        } else {
            return "No"
        }
    }


    const filteredAppts = appointments.filter(apps => {
        if (search === '') {
            return apps
        } else {
            let filtered = Object.keys(apps).map(function(key) {
                return apps[key];
            });
            if (filtered.includes(search)) {
                return filtered
            }

        }
    })



    return (
    <>
        <div className="container">
            <nav className="navbar navbar-light my-1">
                <span className="navbar-brand mb-0 h1 fs-1">Service History</span>
                <input className="navbar-brand h1 mb-0 me-2" onChange={handleSearch}  type="search" pattern={appointments.vin} list="datalistOptions" id="exampleDataList" placeholder="Vin search..." />
                    <datalist id="datalistOptions">
                        {appointments.map(appt => {
                            return (
                                <option key={appt.id} value={appt.vin}>{appt.vin}</option>
                            )
                        })}
                    </datalist>
            </nav>
        </div>
        <table className="table table-striped table-hover my-4">
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
                {filteredAppts.map(appt => {
                    return (
                        <tr key={appt.id}>
                            <td>{ appt.vin }</td>
                            <td>{ appt.customer }</td>
                            <td>{handleVIP(appt.vin)}</td>
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

export default ServiceHistory;
