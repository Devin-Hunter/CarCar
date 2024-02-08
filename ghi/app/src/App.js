import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import MainPage from './MainPage';
import Nav from './Nav';
import ServiceHistory from './ServiceHistory';
import AppointmentsList from './AppointmentsList';
import CreateAppointmentForm from './CreateAppoinment';
// import Appointments from './Appointments';
import TechnicianList from './TechnicianList';
import AddTechnician from './AddTechnician';
import ManufacturerList from './Manufacturer';
import ModelsList from './Models';

function App() {

  const [manufacturer, setManufacturer] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [car, setCar] = useState([]);

  const getManufacturers = async function() {
    const response = await fetch(`http://localhost:8100/api/manufacturers/`);

    if (!response.ok) {
        throw new Error ('Bad fetch response for Manufacturers');
    } else {
        const data = await response.json();
        const manufacturer = data.manufacturers;
        setManufacturer(manufacturer);
    }
  }

  const getAppointments = async function() {
    const response = await fetch(`http://localhost:8081/api/appointments`);

    if (!response.ok) {
        throw new Error ('Bad fetch response for Appointments');
    } else {
        const data = await response.json();
        const appointments = data.appointments;
        setAppointments(appointments);
    }
  }

  const getTechnician = async function() {
    const response = await fetch(`http://localhost:8081/api/technicians`);

    if (!response.ok) {
      throw new Error ('Bad fetch response for Technicians');
    } else {
      const data = await response.json();
      const technicians = data.techs;
      setTechnicians(technicians);
    }
  }

  const getCars = async function() {
    const response = await fetch(`http://localhost:8100/api/automobiles`);

    if (!response.ok) {
      throw new Error ('Bad fetch response for Automobiles')
    } else {
      const data = await response.json();
      const cars = data.autos;
      setCar(cars);
    }
  }

  useEffect(() => {
    getManufacturers();
    getAppointments();
    getTechnician();
    getCars();
  }, [])

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route className="services">
            <Route path="/appointments" element={<AppointmentsList appointments={appointments} />} />
            <Route path="/servicehistory" element={<ServiceHistory appointments={appointments} />} />
            <Route path="/createappointment" element={<CreateAppointmentForm appointments={appointments} techs={technicians} car={car} />} />
          </Route>
          <Route className="technicians">
            <Route path="/technicians" element={<TechnicianList technicians={technicians} />} />
            <Route path="/newtechnician" element={<AddTechnician technicians={technicians} />} />
          </Route>
          <Route className="inventory">
            <Route path="/manufacturers" element={<ManufacturerList manufacturer={manufacturer}/>} />
            <Route path="/models" element={<ModelsList manufacturer={manufacturer}/>} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
