import React from 'react'
import Navigation from '../Components/Nav'
import { useEffect, useState } from 'react';
import Axios from 'axios'
import './OrderDetails.css'

function OrderDetails() {
  const [cartItems, setCartItems] = useState([])
  const fetchCartItems = async () => {
    try {
      const response = await Axios.get(`http://localhost:8000/cart/alla`);
      setCartItems(response.data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);
  console.log(cartItems)
  return (
    <div>
      <div>
        <Navigation />
      </div>
      <table className="custom-table">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(cart => (
            <tr key={cart._id}>
              <td>{cart.userId.name}</td>
              <td>{cart.productId.ProductName}</td>
              <td>{cart.productId.Price}</td>
              <td>{cart.Quantity}</td>
              <td>{cart.totalPrice}</td>
              {/* <td className='status-badge'>{cart.status ? "Sold" : "Not Sold"}</td> */}
              <td
                className={`status-badge ${cart.status ? "status-active" : "status-inactive"
                  }`}
              >
                {cart.status ? "Sold" : "Not sold"}
              </td>
              {/* <td>
            <img src={product.Image} alt={product.ProductName} style={{ width: '100px', height: 'auto' }} />
          </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default OrderDetails