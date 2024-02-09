import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
          <ul className='navbar-nav'>
            
            <li className='nav-item'> 
              <a className="nav-link" id='navbarDarkMenuLink' role="button" href='/manufacturers' aria-expanded="false" >Manufacturers</a>
            </li>
            <li className='nav-item'>
              <a className="nav-link" id='navbarDarkMenuLink' role="button" href='/models' aria-expanded="false" >Models</a>
            </li>

            <li className='nav-item dropdown'>
              <a className="nav-link dropdown-toggle" id='navbarDarkDropdownMenuLink' role="button" data-bs-toggle="dropdown" aria-expanded="false" >Inventory</a>
              <div className='dropdown-menu dropdown-menu-dark'>
                <a className='dropdown-item' href='/automobiles'>Current Inventory</a>
                <a className='dropdown-item' href='/automobiles/new'>Add to Inventory</a>
              </div>
            </li>
            <li className='nav-item dropdown'>
              <a className="nav-link dropdown-toggle" id='navbarDarkDropdownMenuLink' role="button" data-bs-toggle="dropdown" aria-expanded="false" >Sales People</a>
              <div className='dropdown-menu dropdown-menu-dark'>
                <a className='dropdown-item' href='/salesperson'>View Salespeople</a>
                <a className='dropdown-item' href='/salesperson/new'>Add Salesperson</a>
              </div>
            </li>
            <li className='nav-item dropdown'>
              <a className="nav-link dropdown-toggle" id='navbarDarkDropdownMenuLink' role="button" data-bs-toggle="dropdown" aria-expanded="false" >Customers</a>
              <div className='dropdown-menu dropdown-menu-dark'>
                <a className='dropdown-item' href='/customers'>View Customers</a>
                <a className='dropdown-item' href='/customers/new'>Add Customer</a>
              </div>
            </li>
            <li className='nav-item dropdown'>
              <a className="nav-link dropdown-toggle" id='navbarDarkDropdownMenuLink' role="button" data-bs-toggle="dropdown" aria-expanded="false" >Sales</a>
              <div className='dropdown-menu dropdown-menu-dark'>
                <a className='dropdown-item' href='/sales'>List Sales</a>
                <a className='dropdown-item' href='/sales/employee'>Sales by Employee</a>
                <a className='dropdown-item' href='/sales/new'>Add Sale</a>
              </div>
            </li>
            
            <li className='nav-item dropdown'>
              <a className="nav-link dropdown-toggle" id='navbarDarkDropdownMenuLink' role="button" data-bs-toggle="dropdown" aria-expanded="false" >Services</a>
              <div className='dropdown-menu dropdown-menu-dark'>
                <a className='dropdown-item' href='/appointments'>Appointments</a>
                <a className='dropdown-item' href='/createappointment'>Create Appointment</a>
                <a className='dropdown-item' href='/servicehistory'>Service History</a>
              </div>
            </li>
            <li className='nav-item dropdown'>
              <a className="nav-link dropdown-toggle" id='navbarDarkDropdownMenuLink' role="button" data-bs-toggle="dropdown" aria-expanded="false" >Technicians</a>
              <div className='dropdown-menu dropdown-menu-dark'>
                <a className='dropdown-item' href='/technicians'>View Technicians</a>
                <a className='dropdown-item' href='/newtechnician'>Add Technician</a>
              </div>
            </li>

          </ul>
            
        </div>
      </div>
    </nav>
  );
}

export default Nav;
