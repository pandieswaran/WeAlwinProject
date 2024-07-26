import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import '../Components/Nav.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Navigation() {
  const Navigate = useNavigate();
  const handleLogout = () => {

    toast.success("Logged out successfully!");
    localStorage.removeItem('token');
    Navigate('/login');
    window.location.reload()
  };

  return (
    <div className="unique-nav-container">
      <Nav className="unique-nav" activeKey="/home">
        <Nav.Item>
          <Nav.Link href="/home">Shopify.IN</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/productadd">Add Product</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/orderdetails">Order Details</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/userdetails">User DataBase</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/categoryadd">Add Category</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/subcategoryadd">Add SubCategory</Nav.Link>
        </Nav.Item>
        <div className="ms-auto">
          <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
        </div>
      </Nav>
    </div>
  );
}

export default Navigation;
