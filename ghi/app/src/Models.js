import React, {useEffect, useState} from "react";

export default function ModelsList(props) {

    const manufacturer = props.manufacturer
    const [models, setModels] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        manufacturer_id: '',
        picture_url: '',
    });

    const getModels = async function() {
        const response = await fetch(`http://localhost:8100/api/models/`);

        if (!response.ok) {
            throw new Error ('Bad fetch response for Models');
        } else {
            const data = await response.json();
            const models = data.models;
            console.log(models)
            setModels(models);
        }
    }

    const handleFormChange = (event) => {
        const value = event.target.value;
        const inputName = event.target.name;

        setFormData({
            ...formData,
            [inputName]: value
        });
    }

    const handleSubmit = async function (event) {
        event.preventDefault();

        const url = `http://localhost:8100/api/models/`;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const response = await fetch(url, fetchConfig);
        if (!response.ok) {
            throw new Error ('Bad fetch response while adding new Model');
        } else {
            setFormData({
                name: '',
                manufacturer_id: '',
                picture_url: '',
            });
            window.location.href = '/models';
        }
    }

    useEffect(() => {
        getModels();
    }, [])

    return (
        <>
            <h1>Models</h1>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="list-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Models List</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Add New Model</button>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="list-tab">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Manufacturer</th>
                                <th>Picture</th>
                            </tr>
                        </thead>
                        <tbody>
                            {models.map(mod => {
                                return (
                                    <tr key={mod.id}>
                                        <td>{ mod.name }</td>
                                        <td>{ mod.manufacturer.name }</td>
                                        <td>
                                            <img src={mod.picture_url} alt='' className=""></img>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    <div className="row">
                        <div className="offset-3 col-6">
                            <div className="shadow p-4 mt-4">
                                <h1>Add a New Model</h1>
                                <form onSubmit={handleSubmit} id="create-manufacturer-form">

                                    <div className="form-floating mb-3">
                                        <input onChange={handleFormChange} placeholder="name" required type="text" name="name" id="name" className="form-control" />
                                        <label htmlFor="name">Name</label>
                                    </div>

                                    <div className="mb-3">
                                        <select onChange={handleFormChange} required name="manufacturer" id="manufacturer_id" className="form-select">
                                            <option value="">Choose a Manufacturer</option>
                                            {manufacturer.map(m => {
                                            return (
                                                <option key={m.id} value={models.manufacturer_id}>{m.name}</option>
                                            )
                                            })}
                                        </select>
                                    </div>

                                    <div className="form-floating mb-3">
                                        <input onChange={handleFormChange} placeholder="picture_url" required type="text" name="picture_url" id="picture_url" className="form-control" />
                                        <label htmlFor="picture_url">Picture URL</label>
                                    </div>

                                    <button className="btn btn-primary">Create</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
