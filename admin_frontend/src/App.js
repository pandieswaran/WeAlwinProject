import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navigate from 'react-router-dom';
import ProductAdd from './Pages/ProductAdd';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import OrderDetails from './Pages/OrderDetails';
import ProductUpdate from './Pages/ProductUpdate';
import UserDatas from './Pages/UserPage';
import CategoryAdd from './Pages/CategoryAdd';
import SubCategoryAdd from './Pages/SubCategoryAdd';
// import Navigation from './Components/Nav';


function App() {
  const token = localStorage.getItem('token');
  return (
    <Router>
      <div className="content content-scrollable">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          {token ? (
            <>
              <Route path="/home" element={<HomePage />} />
              <Route path="/productadd" element={<ProductAdd />} />
              <Route path="/product-edit/:productId" element={<ProductUpdate />} />
              <Route path="/orderdetails" element={<OrderDetails />} />
              <Route path="/userdetails" element={<UserDatas/>} />
              <Route path="/categoryadd" element={<CategoryAdd/>} />
              <Route path="/subcategoryadd" element={<SubCategoryAdd/>} />
            </>
          ) : (
            <Route path="*" element={<LoginPage />} />
          )}
        </Routes>
      </div>
      <ToastContainer />
    </Router>
  );
}

export default App;
