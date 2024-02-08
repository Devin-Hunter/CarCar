import React, {useState, useEffect} from "react";

const ListInventory = function (){
    const [inventory, setInventory] = useState([]);

    const getInventory = async () =>{
        const url ='http://localhost:8100/api/automobiles/';
        const response = await fetch(url);
        if (response.ok){
            const data = await response.json();
            const inventory = data.autos;
            
            setInventory(inventory);
        }
    }
    useEffect(() =>{
        getInventory();
    }, []);

    return(
        <div className='p-4 mt-4 mb-4'>
            <h1>Inventory</h1>
            <div className="mb-4">
                <table className="table table-dark table-striped mt-4 mb-4" >
                    <thead>
                        <tr>
                            <th scope="col">VIN</th>
                            <th scope="col">Color</th>
                            <th scope="col">Year</th>
                            <th scope="col">Model</th>
                            <th scope="col">Manufacturer</th>
                            <th scope="col">Sold</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventory.map(vehicle => {
                            return(
                                <tr key={vehicle.vin}>
                                    <td>{vehicle.vin}</td>
                                    <td>{vehicle.color}</td>
                                    <td>{vehicle.year}</td>
                                    <td>{vehicle.model.name}</td>
                                    <td>{vehicle.model.manufacturer.name}</td>
                                    <td>{vehicle.sold.toString()}</td>
                                </tr>
                            )
                        })} 
                    </tbody>
                </table>
            </div>
            
        </div>
    );
}
export default ListInventory;