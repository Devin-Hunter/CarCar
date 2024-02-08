import React, {useState, useEffect} from "react";

const AddSale = function (){
    const [vehicles, setVehicles] = useState([]);
    const [salespeople, setSalespeople] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [price, setPrice] = useState('');
    const [vehicleChoice, setVehicleChoice] = useState('');
    const [salespersonChoice, setSalespersonChoice] = useState('');
    const [customerChoice, setCustomerChoice] = useState('');

    const fetchData = async () => {
        const vehicleUrl = 'http://localhost:8100/api/automobiles/';
        const salespersonUrl = 'http://localhost:8090/api/salespeople/';
        const customerUrl = 'http://localhost:8090/api/customers/';
        
        try {
            const vehicleResponse = await fetch(vehicleUrl);
            const salespersonResponse = await fetch(salespersonUrl);
            const customerUrlResponse = await fetch(customerUrl);
            if (vehicleResponse.ok) {
                const vehicleData = await vehicleResponse.json();
                const vehicles = vehicleData.autos.filter(vehicle => vehicle.sold === false); 
                console.log(vehicleData);
                setVehicles(vehicles);
                console.log('vehicles',vehicles)
            }

            if (salespersonResponse.ok) {
                const salespersonData = await salespersonResponse.json();
                const salespeople = salespersonData.salespeople;
                setSalespeople(salespeople);
            }

            if (customerUrlResponse.ok) {
                const customerData = await customerUrlResponse.json();
                const customers = customerData.customers;
                setCustomers(customers);
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const handlePrice = (event) => {
        const value = event.target.value;
        setPrice(value);
    }

    const handleVehicleChoice = (event) => {
        const value = event.target.value;
        setVehicleChoice(value);
    }

    const handleSalespersonChoice = (event) => {
        const value = event.target.value;
        setSalespersonChoice(value)
    }

    const handleCustomerChoice = (event) => {
        const value = event.target.value;
        setCustomerChoice(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.price = price;
        data.salesperson = salespersonChoice;
        data.customer = customerChoice;
        data.automobile = vehicleChoice;
        
        console.log(data)

        const url = 'http://localhost:8090/api/sales/'
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        
        const postResponse = await fetch(url, fetchOptions);
        if (postResponse.ok) {
            setPrice('');
            setVehicleChoice('');
            setSalespersonChoice('');
            setCustomerChoice('');
        }
    }

    return(
        <div className='row'>
            <div className="offset-3 col-6">
                <div className='shadow p-4 mt-4 mb-4' style={{backgroundColor: 'gray'}}>
                    <form id='add-sales-person' > 
                        <h1>Add a New Sale</h1>
                        <div className="form-group mb-3">
                            <select onChange={handleVehicleChoice} name='vehicle'>
                                <option value=''>Select a Vehicle</option>
                                {vehicles.map(vehicle => {
                                    return(
                                        <option key = {vehicle.vin} value = {vehicle.vin}>{vehicle.vin}-{vehicle.model.manufacturer.name}-{vehicle.model.name}-{vehicle.color}</option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="form-group mb-3">
                            <select onChange={handleSalespersonChoice} name='salesperson'>
                                <option value=''>Select a Salesperson</option>
                                {salespeople.map(salesperson => {
                                    return(
                                        <option key = {salesperson.employee_id}>{salesperson.employee_id} - {salesperson.first_name}</option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="form-group mb-3">
                            <select onChange={handleCustomerChoice} name='customer'>
                                <option value=''>Select a Customer</option>
                                {customers.map(customer => {
                                    return(
                                        <option key = {customer.id}>{customer.first_name} {customer.last_name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor='price'>Price</label>
                            <input 
                            onChange={handlePrice}
                            value={price}
                            type='number'
                            id='price'
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
export default AddSale;