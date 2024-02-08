import React, {useState} from "react";

const AddCustomer = function (){
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    const handleFirstName = (event) => {
        const value = event.target.value;
        setFirstName(value);
    }
    const handleLastName = (event) => {
        const value = event.target.value;
        setLastName(value);
    }
    const handleAddress = (event) => {
        const value = event.target.value;
        setAddress(value);
    }
    const handlePhone = (event) => {
        const value = event.target.value;
        setPhone(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data ={};
        data.first_name = firstName;
        data.last_name = lastName;
        data.address = address;
        data.phone = phone;

        const url= 'http://localhost:8090/api/customers/';
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type' : 'application/json',
            }
        }

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            const newCustomer = await response.json();

            setFirstName('');
            setLastName('');
            setAddress('');
            setPhone('');
        }
    }


    return (
        <div className='row'>
            <div className="offset-3 col-6">
                <div className='shadow p-4 mt-4 mb-4' style={{backgroundColor: 'gray'}}>
                    <form id='add-sales-person' onSubmit={handleSubmit}> 
                        <h1>Add a New Customer</h1>
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
                            <label htmlFor='address'>Address</label>
                            <input 
                            onChange={handleAddress}
                            value = {address}
                            type='text'
                            id='address'
                            className='form-control'
                            required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor='phone'>Phone Number</label>
                            <input 
                            onChange={handlePhone}
                            value = {phone}
                            type='text'
                            id='phone'
                            className='form-control'
                            required
                            />
                        </div>
                        <button type='submit' className='btn btn-primary'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AddCustomer