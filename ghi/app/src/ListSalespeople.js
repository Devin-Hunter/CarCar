import React, {useState, useEffect} from "react";

const ListSalespeople = function (){
    const [salespeople, setSalespeople] = useState([]);

    const getSalespeople = async () =>{
        const url ='http://localhost:8090/api/salespeople/';
        const response = await fetch(url);
        if (response.ok){
            const data = await response.json();
            const salespeople = data.salespeople;
            setSalespeople(salespeople);
        }
    }
    useEffect(() =>{
        getSalespeople();
    }, []);

    return(
        <div className='p-4 mt-4 mb-4'>
            <h1>Salespeople</h1>
            <div className="mb-4">
                <table className="table table-dark table-striped mt-4" >
                    <thead>
                        <tr>
                            <th scope="col">Employee ID</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salespeople.map(salesperson => {
                            return(
                                <tr key={salesperson.employee_id}>
                                    <td>{salesperson.employee_id}</td>
                                    <td>{salesperson.first_name}</td>
                                    <td>{salesperson.last_name}</td>
                                </tr>
                            )
                        })} 
                    </tbody>
                </table>
            </div>
            
        </div>
    );
}
export default ListSalespeople;