// Home.js
import Navigation from '../Components/Navigation'
import '../App.css'
import React, { useState, useEffect } from 'react';
// import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

function HomePage({ addToCart }) {
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/products');
        setProducts(response.data);
        // console.log(response.data, "111")
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // const handleAddToCart = (productId) => {
  //   console.log('Adding productId to cart:', productId);
  //   // Call addToCart function to update cart state
  //   addToCart(productId);
  // };

  const [searchInput, setSearchInput] = useState('');

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8000/home/search?name=${searchInput}`);
      setProducts(response.data);
      console.log('Search Results:', response.data);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch(event);
    }
  };

  const handleRedirect = (productId) => {
    navigate(`/${productId}`);
};

  return (
    <>
      <div>

        <Navigation />
        <div className="ms-auto w-25 pt-3">
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={handleKeyPress} // Trigger search on Enter key press
            />
          </Form>
        </div>
        <Container className="mt-2 product-container">
          <Row xs={1} md={2} lg={3} xl={4} className="g-4">
            {products.map(product => (
              <Col key={product._id}>
                <Card style={{ width: '20rem', height: '100%', marginBottom: '20px' }}>
                  <Card.Img
                    variant="top"
                    src={product.Image}
                    style={{ height: '100%', objectFit: 'contain' }}
                  />
                  <Card.Body className='card-body'>
                    <Card.Title
                      onClick={() => handleRedirect(product?._id)}
                      style={{ cursor: 'pointer' }}>
                      {product.ProductName.length > 20 ? `${product.ProductName.substring(0, 20)}...` : product.ProductName}
                    </Card.Title>
                    <p>
                      Description:{' '}
                      {product.Description.length > 20
                        ? `${product.Description.substring(0, 40)}...`
                        : product.Description}
                    </p>
                    <p className='card-price'>Price: ₹{product.Price}</p>
                    {/* Link to navigate to Cart page after adding to cart */}
                    {/* <Link to="/cart">
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="primary" className='homeB' onClick={() => handleAddToCart(product._id)}>
                          Add to Cart
                        </Button>
                      </div>
                    </Link> */}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
}

export default HomePage;
