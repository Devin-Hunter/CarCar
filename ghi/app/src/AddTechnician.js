import React, {useState} from "react";

export default function AddTechnician(props) {

    const techs = props.technicians

    const initialFormData = {
        first_name: '',
        last_name: '',
        employee_id: '',
    }

    const [formData, setFormData] = useState(initialFormData);

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

        const url = `http://localhost:8081/api/technicians/`;



        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        }



        const response = await fetch(url, fetchConfig);
        if (!response.ok) {
            throw new Error ('Bad fetch response while adding new Technician');
        } else {
            setFormData(initialFormData)
            window.location.href = "/technicians"
        }
    }

    return (
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Add a New Technician</h1>
              <form onSubmit={handleSubmit} id="create-technician-form">

                <div className="form-floating mb-3">
                  <input onChange={handleFormChange} placeholder="first_name" required type="text" name="first_name" id="first_name" className="form-control" />
                  <label htmlFor="first_name">First Name</label>
                </div>

                <div className="form-floating mb-3">
                  <input onChange={handleFormChange} placeholder="last_name" required type="text" name="last_name" id="last_name" className="form-control" />
                  <label htmlFor="last_name">Last Name</label>
                </div>

                <div className="form-floating mb-3">
                  <input onChange={handleFormChange} placeholder="employee_id" required type="text" name="employee_id" id="employee_id" className="form-control" />
                  <label htmlFor="employee_id">Employee ID</label>
                </div>

                <button className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
    )

}
