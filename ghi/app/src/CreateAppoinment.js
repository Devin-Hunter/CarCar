import React, {useState} from "react";

export default function CreateAppointmentForm(props) {

    const appointments = props.appointments;
    const techs = props.techs
    const car = props.car;

    const [formData, setFormData] = useState({
        date_time: '',
        reason: '',
        vin: '',
        customer: '',
        technician: '',
    });

    const handleFormChange = (event) => {
        const value = event.target.value;
        const inputName = event.target.name;

        setFormData({
            ...formData,
            [inputName]: value
        });
    }

    const handleSubmit = async function (event) {
        event.preventDefault();

        const url = `http://localhost:8081/api/appointments/`;



        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        }



        const response = await fetch(url, fetchConfig);
        if (!response.ok) {
            throw new Error ('Bad fetch response while adding new Appointment');
        } else {
            setFormData({
                date_time: '',
                reason: '',
                vin: '',
                customer: '',
                technician: '',
            })
            window.location.href = "/appointments"
        }
    }

    return (
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Make a Service Appointment</h1>
              <form onSubmit={handleSubmit} id="create-appointment-form">

                <div className="form-floating mb-3">
                  <input onChange={handleFormChange} placeholder="vin" required type="text" name="vin" id="vin" className="form-control" />
                  <label htmlFor="vin">Automobile Vin</label>
                </div>

                <div className="form-floating mb-3">
                  <input onChange={handleFormChange} placeholder="customer" required type="text" name="customer" id="customer" className="form-control" />
                  <label htmlFor="customer">Customer</label>
                </div>

                <div className="form-floating mb-3">
                  <input onChange={handleFormChange} placeholder="date_time" required type="datetime-local" name="date_time" id="date_time" className="form-control" />
                  <label htmlFor="date_time">Date & Time</label>
                </div>

                <div className="mb-3">
                  <select onChange={handleFormChange} required name="technician" id="technician" className="form-select">
                    <option value="">Choose a Technician</option>
                    {techs.map(tech => {
                      return (
                        <option key={tech.employee_id} value={tech.employee_id}>{tech.first_name} {tech.last_name}</option>
                      )
                    })}
                  </select>
                </div>

                <div className="form-floating mb-3">
                  <input onChange={handleFormChange} placeholder="reason" required type="text" name="reason" id="reason" className="form-control" />
                  <label htmlFor="reason">Reason</label>
                </div>

                <button className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
    )


}
