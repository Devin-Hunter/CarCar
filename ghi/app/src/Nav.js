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
            <li className='nav-item dropdown'>
              <a className="nav-link dropdown-toggle" id='navbarDarkDropdownMenuLink' role="button" data-bs-toggle="dropdown" aria-expanded="false" >Manufacturer</a>
              <div className='dropdown-menu dropdown-menu-dark'>
                <a className='dropdown-item' href='/'>Manufacturer List</a>
                <a className='dropdown-item' href='/'>Add Manufacturer</a>
              </div>
            </li>
            <li className='nav-item dropdown'>
              <a className="nav-link dropdown-toggle" id='navbarDarkDropdownMenuLink' role="button" data-bs-toggle="dropdown" aria-expanded="false" >Models</a>
              <div className='dropdown-menu dropdown-menu-dark'>
                <a className='dropdown-item' href='/'>Model List</a>
                <a className='dropdown-item' href='/'>Add Model</a>
              </div>
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

          </ul>
            
        </div>
      </div>
    </nav>
  )
}

export default Nav;
