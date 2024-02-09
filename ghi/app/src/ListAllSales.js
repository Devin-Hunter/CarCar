import React, {useState, useEffect} from "react";


const ListSales = function (){
    const [sales, setSales] = useState([]);

    const getSales = async () =>{
        const url ='http://localhost:8090/api/sales/';
        const response = await fetch(url);
        if (response.ok){
            const data = await response.json();
            const sales = data.sales;
            setSales(sales);
        }
    }  
    useEffect(() =>{
        getSales();
    }, []);

    return(
        <div className='p-4 mt-4 mb-4'>
            <h1>All Sales</h1>
            <div className="mb-4">               
                <table className="table table-dark table-striped mt-4 mb-4" >
                    <thead>
                        <tr>
                            <th scope="col">VIN</th>
                            <th scope="col">Price</th>
                            <th scope="col">Salesperson</th>
                            <th scope="col">Employee ID</th>
                            <th scope="col">Customer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map(sale => {
                            return(
                                <tr key={sale.automobile.vin}>
                                    <td>{sale.automobile.vin}</td>
                                    <td>{sale.price}</td>
                                    <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                                    <td>{sale.salesperson.employee_id}</td>
                                    <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                                </tr>
                            )
                        })} 
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default ListSales;