import React, {useState} from "react";

export default function ManufacturerList(props) {

    const manufacturer = props.manufacturer
    const [name, setName] = useState('');

    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }

    const handleSubmit = async function (event) {
        event.preventDefault();

        const data = {}
        data.name = name;

        const url = `http://localhost:8100/api/manufacturers/`;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const response = await fetch(url, fetchConfig);
        if (!response.ok) {
            setName('');
            throw new Error ('Bad fetch response while adding new Manufacturer');
        } else {
            setName('');
            window.location.href = '/manufacturers';
        }
    }

    return (
        <>
            <h1>Manufacturers</h1>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="list-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Manufacturer List</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Add New Manufacturer</button>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="list-tab">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {manufacturer.map(man => {
                                return (
                                    <tr key={man.id}>
                                        <td>{ man.name }</td>
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
                                <h1>Add a New Manufacturer</h1>
                                <form onSubmit={handleSubmit} id="create-manufacturer-form">

                                    <div className="form-floating mb-3">
                                    <input onChange={handleNameChange} placeholder="name" required type="text" name="name" id="name" className="form-control" />
                                    <label htmlFor="name">Name</label>
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
