import React, {useState, useEffect} from "react"

const ListEmployeeSales = function (){
    const [sales, setSales] = useState([]); 
    const [filter, setFilter] =useState([]); 
    const [employeeChoice, setEmployeeChoice] = useState(''); 

    const getSales = async () =>{
        const url ='http://localhost:8090/api/sales/';
        const response = await fetch(url);
        if (response.ok){
            const data = await response.json();
            const sales = data.sales;
            setSales(sales);
        }
    }
    const getSalespeople = async () => {
        const url = 'http://localhost:8090/api/salespeople/';
        const response = await fetch(url);
        if (response.ok){
            const data = await response.json();
            const salespeople = data.salespeople;
            setFilter(salespeople);
        }
    }
    useEffect(() =>{
        getSales();
        getSalespeople();
    }, []);

    const handleEmployeeChoice = (event) => {
        const value = event.target.value;
        setEmployeeChoice(value);
    }

    return(
        <div className='p-4 mt-4 mb-4'>
            <h1>Sales by Employee</h1>
            <div className="mb-4">
                <div>
                    <select onChange ={handleEmployeeChoice} value={employeeChoice} id="employee_id" className="form-select"  >
                        <option>Choose an employee</option>
                        {filter.map(employee =>{
                            return(
                                <option key={employee.employee_id} value={employee.employee_id}>{employee.first_name} {employee.last_name}</option>
                            )
                        })}
                    </select>
                </div>
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
                        {sales.filter(sale => sale.salesperson.employee_id == employeeChoice).map(sale => {
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
export default ListEmployeeSales;