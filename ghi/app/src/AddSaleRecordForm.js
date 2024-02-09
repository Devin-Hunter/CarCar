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
                
                setVehicles(vehicles);
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
        setSalespersonChoice(value);
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
        
        

        const autoUrl = `http://localhost:8100/api/automobiles/${vehicleChoice}/`
        const update = {"sold": true}
        const autoFetchOptions = {
            method: 'put',
            body: JSON.stringify(update),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const autoUpdate = await fetch(autoUrl, autoFetchOptions)
        if (autoUpdate.okay){
            
        }

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
                    <form id='add-sales-record' onSubmit={handleSubmit}> 
                        <h1>Add a New Sale</h1>
                        <div className="form-group mb-3">
                            <select onChange={handleVehicleChoice} value={vehicleChoice} name='vehicle' className="form-select" required>
                                <option value=''>Select a Vehicle</option>
                                {vehicles.map(vehicle => {
                                    return(
                                        <option key = {vehicle.vin} value = {vehicle.vin}>{vehicle.vin}-{vehicle.model.manufacturer.name}-{vehicle.model.name}-{vehicle.color}</option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="form-group mb-3">
                            <select onChange={handleSalespersonChoice} value={salespersonChoice} name='salesperson' className="form-select" required>
                                <option value=''>Select a Salesperson</option>
                                {salespeople.map(salesperson => {
                                    return(
                                        <option key = {salesperson.employee_id} value = {salesperson.employee_id}>{salesperson.employee_id} - {salesperson.first_name}</option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="form-group mb-3">
                            <select onChange={handleCustomerChoice} value={customerChoice} name='customer' className="form-select" required>
                                <option value=''>Select a Customer</option>
                                {customers.map(customer => {
                                    return(
                                        <option key = {customer.id} value={customer.id} >{customer.first_name} {customer.last_name}</option>
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