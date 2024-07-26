import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Navigation from '../Components/Navigation';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';

function Cart() {
  const [cartItems, setCartItems] = useState([]); // Ensure cartItems is an array
  const [loading, setLoading] = useState(true);

  const fetchCartItems = async () => {
    try {
      const userId = localStorage.getItem('userid');
      if (!userId) {
        console.error('No userId found in localStorage');
        return;
      }
      const response = await axios.get(`http://localhost:8000/cart/${userId}`);
      setCartItems(response.data); // Assuming response.data is an array
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  console.log(cartItems, "setCartItemsssetCartItemss");

  if (loading) return <div>Loading...</div>;

  const handleBuy = () => {
    toast.success("Order placed successfully");
  };

  const handleIncrement = async (id) => {
    try {
      const response = await axios.put(`http://localhost:8000/cart/inc/${id}`);
      if (response.data.status) {
        toast.success("Successfully Updated Quantity");
        fetchCartItems();
      } else {
        toast.error("Quantity is less than one");
      }
    } catch (error) {
      console.error("Error updating cart item:", error);
      toast.error("An error occurred while updating the cart item");
    }
  };

  const handleDecrement = async (id) => {
    console.log(id, "idid");
      try {
        const response = await axios.put(`http://localhost:8000/cart/upd/${id}`);
        if (response.data.status) {
          toast.success("Successfully Updated Quantity");
          fetchCartItems();
        } else {
          toast.error("Quantity is less than one");
        }
      } catch (error) {
        console.error("Error updating cart item:", error);
        toast.error("An error occurred while updating the cart item");
      }
    };

  const removeCartItem = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/cart/del/${id}`);
      if (response.data.status) {
        toast.success("Successfully Deleted");
        fetchCartItems();
      } else {
        toast.error("Error removing item");
      }
      fetchCartItems();
    } catch (error) {
      console.error("Error removing cart item:", error);
      toast.error("An error occurred while removing the cart item");
    }
  };

  return (
    <>
      <Navigation />
      <Container className="product-detail-container">
        {cartItems.map((cart) => (
          <Row key={cart._id} className="mb-4">
            <Col md={6}>
              <img src={cart.productId.Image} alt={cart.ProductName} style={{ width: '100%', height: 'auto' }} />
            </Col>
            <Col md={6} className='d-flex flex-column justify-content-around'>
              <h2>{cart.productId.ProductName}</h2>
              <p>{cart.productId.Description}</p>
              <p>Price: ₹{cart.productId.Price}</p>
              <p>Total Price: ₹{cart.totalPrice}</p>
              <div className="d-flex align-items-center">
                <Button
                  className="quantity-btn"
                  variant="outline-secondary"
                  onClick={() => handleDecrement(cart._id)}
                  disabled={cart.Quantity <= 1}
                >
                  -
                </Button>
                <h className="text-center" style={{ width: '50px' }}>{cart.Quantity}</h>
                <Button
                  className="quantity-btn"
                  variant="outline-success"
                  onClick={() => handleIncrement(cart._id)}
                >
                  +
                </Button>
              </div>
              <div className="d-flex gap-3">
                <Button style={{ width: '100px' }} variant="outline-danger" onClick={() => removeCartItem(cart._id)}>Remove</Button>
                <Button style={{ width: '100px' }} variant="outline-success" onClick={() => handleBuy(cart._id)}>Buy</Button>
              </div>
            </Col>
          </Row>
        ))}
      </Container>
    </>
  );
}

export default Cart;
