import React, {useState, useEffect} from "react";

const ListCustomers = function (){
    const [customers, setCustomers] = useState([]);

    const getCustomers = async () =>{
        const url ='http://localhost:8090/api/customers/';
        const response = await fetch(url);
        if (response.ok){
            const data = await response.json();
            const customers = data.customers;
            setCustomers(customers);
        }
    }
    useEffect(() =>{
        getCustomers();
    }, []);

    return(
        <div className='p-4 mt-4 mb-4'>
            <h1>Customers</h1>
            <div className="mb-4">
                <table className="table table-dark table-striped mt-4" >
                    <thead>
                        <tr>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Address</th>
                            <th scope="col">Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map(customer => {
                            return(
                                <tr key={customer.id}>
                                    <td>{customer.first_name}</td>
                                    <td>{customer.last_name}</td>
                                    <td>{customer.address}</td>
                                    <td>{customer.phone_number}</td>
                                </tr>
                            )
                        })} 
                    </tbody>
                </table>
            </div>
            
        </div>
    );
}
export default ListCustomers;