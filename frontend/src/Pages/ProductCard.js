import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Navigation from '../Components/Navigation';
import { useNavigate } from 'react-router-dom';
import './Category/Product.css'

const DetailedProduct = () => {
  const navigate = useNavigate()
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/${productId}`);
        setProduct(response.data)
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  console.log(product,"4545")

  const handleAddToCart = async () => {
    const userId = localStorage.getItem('userid');
    try {
      const response = await axios.post('http://localhost:8000/cart', {
        userId,
        productId: product._id
      });
      console.log('Product added to cart:', response.data);
      navigate('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error); // Highlighting the error logging
    }
  };

  if (loading) return <div>Loading...</div>;

  if (!product) return <div>Product not found.</div>;

  return (
    <div>
      <div >
      <Navigation />
      </div>
      <div>
      <Container className="product-detail-container">
        <Row>
          <Col md={6}>
            <img src={product.Image} alt={product.ProductName} style={{ width: '100%', height: 'auto' }} />
          </Col>
          <Col md={6}>
            <h2>{product.ProductName}</h2>
            <p>{product.Description}</p>
            <p>Price: ₹{product.Price}</p>
            <p>Quantity: {product.Quantity}</p>
            <Button variant="primary" onClick={() => handleAddToCart(product?._id)}>Add to Cart</Button>
          </Col>
        </Row>
      </Container>
      </div>
    </div>
  );
};

export default DetailedProduct;
