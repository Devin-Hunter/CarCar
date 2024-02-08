// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import React, { useEffect, useState } from 'react';
// import Nav from './Nav';
// import ServiceHistory from './ServiceHistory';
// import AppointmentsList from './AppointmentsList';
// import CreateAppointmentForm from './CreateAppoinment';

// export default function Appointments() {
//     const [appointments, setAppointments] = useState([]);

//   const getAppointments = async function() {
//     const response = await fetch(`http://localhost:8081/api/appointments`);

//     if (!response.ok) {
//         console.error(response);
//     } else {
//         const data = await response.json();
//         const appointments = data.appointments;
//         setAppointments(appointments);
//     }
//   }

//   useEffect(() => {
//     getAppointments();
//   }, [])

//   return (
//     <>
//         <Routes>
//             <Route path="/services/appointments" element={<AppointmentsList appointments={appointments} />} />
//             <Route path="/services/servicehistory" element={<ServiceHistory appointments={appointments} />} />
//             <Route path="/createappointment" element={<CreateAppointmentForm appointments={appointments} />} />
//         </Routes>
//     </>
//   );
// }
