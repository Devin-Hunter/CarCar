import React from "react";

export default function TechnicianList(props) {

    const techs = props.technicians

    return (
        <>
            <h1>Technicians</h1>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Full Name</th>
                    </tr>
                </thead>
                <tbody>
                    {techs.map(tech => {
                        return (
                            <tr key={tech.employee_id}>
                                <td>{ tech.employee_id }</td>
                                <td>{ tech.first_name }</td>
                                <td>{ tech.last_name }</td>
                                <td>{tech.first_name}  {tech.last_name}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )

}
