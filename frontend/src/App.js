import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css';
import LoginPage from './Pages/LoginPage'
import HomePage from './Pages/HomePage'
import SignupPage from './Pages/SignupPage';
import ForgetPassword from './Pages/ForgetPassword';
import ProfileUpdate from './Pages/ProfileUpdate'
import Cart from './Pages/cartPage'
import Order from './Pages/OrderPage'
import ProfileDropdown from './Components/ProfilePicture';
// import Mobile from './Pages/Category/mobile'
import Laptop from './Pages/Category/laptop';
import Mencloth from './Pages/Category/mencloth'
import Womencloth from './Pages/Category/womencloth'
import Homekitchen from './Pages/Category/homekitchen';
import Furniture from './Pages/Category/furniture'
import DetailedProduct from './Pages/ProductCard';
import DetailedProductS from './Pages/Display';


function App() {
    const token = localStorage.getItem('token');
    return (
        <>
            <Router>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="forget-password" element={<ForgetPassword />} />
                        <Route path="/home" element={<HomePage />} />
                        {/* <Route path="/category/:category/subcategory/:subcategory" element={<Mobile />} /> */}
                        <Route path="/laptop" element={<Laptop />} />
                        <Route path="/menclothing" element={<Mencloth />} />
                        <Route path="/womenclothing" element={<Womencloth />} />
                        <Route path="/homekitchen" element={<Homekitchen />} />
                        <Route path="/furniture" element={<Furniture />} />
                        <Route path="/:productId" element={<DetailedProduct />} />
                        <Route path="/products/:SubCategory" element={<DetailedProductS />} />
                        {/* <Route path="/:category._id" element={<DetailedProductS />} /> */}
                        {token ? (
                            <>
                                <Route path="/profileDropdown" element={<ProfileDropdown />} />
                                <Route path="/cart" element={<Cart />} />
                                <Route path="/order" element={<Order />} />
                                <Route path="/profile_update" element={<ProfileUpdate />} />
                            </>
                        ) : (
                            <Route path="*" element={<LoginPage />} />
                        )}
                    </Routes>
            </Router>
            <ToastContainer />
        </>
    );
}

export default App;
