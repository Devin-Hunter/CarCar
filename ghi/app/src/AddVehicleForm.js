import React, {useState, useEffect} from "react";
const AddVehicle= function() {
    const [color, setColor] = useState('');
    const [year, setYear] = useState('');
    const [vin, setVIN] = useState('');
    const [models, setModels] = useState([]);
    const [modelChoice, setModelChoice]= useState('');

    const handleColor = (event) => {
        const value = event.target.value;
        setColor(value);
    }

    const handleYear = (event) => {
        const value = event.target.value;
        setYear(value);
    }

    const handleVIN = (event) => {
        const value = event.target.value;
        setVIN(value);
    }

    const handleModelChoice = (event) => {
        const value = event.target.value;
        setModelChoice(value);
    }

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/models/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setModels(data.models);
        }
    } 

    useEffect(() => {
        fetchData();
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.color = color;
        data.year = year;
        data.vin = vin;
        data.model_id = modelChoice;
        
        const salespeopleUrl = 'http://localhost:8100/api/automobiles/'
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        }

        const salespersonResponse = await fetch(salespeopleUrl, fetchOptions);
        if (salespersonResponse.ok) {
            setColor('');
            setYear('');
            setVIN('');
            setModelChoice(' ');
        }
    }

    return(
        <div className='row'>
            <div className="offset-3 col-6">
                <div className='shadow p-4 mt-4 mb-4' style={{backgroundColor: 'gray'}}>
                    <form id='add-sales-person' onSubmit={handleSubmit}> 
                        <h1>Add a New Vehicle</h1>
                        <div className="form-group mb-3">
                            <label htmlFor='color'>Color</label>
                            <input 
                            onChange={handleColor}
                            value={color}
                            type='text'
                            id='color'
                            className='form-control'
                            required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor='year'>Year</label>
                            <input 
                            onChange={handleYear}
                            value={year}
                            type='text'
                            id='year'
                            className='form-control'
                            required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor='vin'>VIN</label>
                            <input 
                            onChange={handleVIN}
                            value = {vin}
                            type='text'
                            id='vin'
                            className='form-control'
                            required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <select onChange = {handleModelChoice} value={modelChoice} name='model' id='model_id' className="form-select"  required>
                                <option value= ''>Choose Model</option>
                                {models.map(model => {
                                    return (
                                        <option key={model.id} value={model.id}>{model.name}</option>
                                    )
                                })}
                            </select>

                        </div>
                        <button type='submit' className='btn btn-primary'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AddVehicle;