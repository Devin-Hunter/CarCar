import React, {useState} from 'react';

const AddSalesPerson= function() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [employeeID, setEmployeeID] = useState('');

    const handleFirstName = (event) => {
        const value = event.target.value;
        setFirstName(value);
    }

    const handleLastName = (event) => {
        const value = event.target.value;
        setLastName(value);
    }

    const handleEmployeeID = (event) => {
        const value = event.target.value;
        setEmployeeID(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.first_name = firstName;
        data.last_name = lastName;
        data.employee_id = employeeID;
        
        const salespeopleUrl = 'http://localhost:8090/api/salespeople/'
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        }

        const salespersonResponse = await fetch(salespeopleUrl, fetchOptions);
        if (salespersonResponse.ok) {
            setFirstName('');
            setLastName('');
            setEmployeeID('');
            console.log('submitted')
        }
    }

    return(
        <div className='row'>
            <div className='shadow p-4 mt-4 mb-4' style={{backgroundColor: 'gray'}}>
                <form id='add-sales-person' onSubmit={handleSubmit}> 
                    <h1>Add a New Sales Person</h1>
                    <div className="form-group mb-3">
                        <label htmlFor='firstName'>First Name</label>
                        <input 
                        onChange={handleFirstName}
                        value={firstName}
                        type='text'
                        id='firstName'
                        className='form-control'
                        required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor='lastName'>Last Name</label>
                        <input 
                        onChange={handleLastName}
                        value={lastName}
                        type='text'
                        id='lastName'
                        className='form-control'
                        required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor='employeeID'>Employee ID</label>
                        <input 
                        onChange={handleEmployeeID}
                        value = {employeeID}
                        type='text'
                        id='employeeID'
                        className='form-control'
                        required
                        />
                    </div>
                    <button type='submit' className='btn btn-primary'>Submit</button>
                </form>
            </div>
        </div>
    )
}
export default AddSalesPerson