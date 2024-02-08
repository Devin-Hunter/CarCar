import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import AddSalesPerson from './AddSalespersonForm';
import ListSalespeople from './ListSalespeople';
import ListInventory from './ListInventory';
import AddVehicle from './AddVehicleForm';
import AddCustomer from './AddCustomerForm';
import ListCustomers from './ListCustomers';
import ListSales from './ListAllSales';
import AddSale from './AddSaleRecordForm';
import ListEmployeeSales from './EmployeeSales';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path='/automobiles' element={<ListInventory />} />
          <Route path='/automobiles/new' element={<AddVehicle />} />
          <Route path='/salesperson' element={<ListSalespeople />} />
          <Route path='/salesperson/new' element={<AddSalesPerson />} />
          <Route path='/customers' element={<ListCustomers />} />
          <Route path='/customers/new' element={<AddCustomer />} />
          <Route path='/sales' element={<ListSales />} />
          <Route path='/sales/employee' element={<ListEmployeeSales />} />
          <Route path='/sales/new' element={<AddSale />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
