import React, { useEffect, useState } from 'react';
import Navigation from '../Components/Nav';
import '../Pages/Homepage.css';
import Axios from 'axios';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
function ProductList() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate()


    const handleUpdate = (productId) => {
        try {
            // Navigate to ProductEdit page with productId as URL parameter
            navigate(`/product-edit/${productId}`);
        } catch (error) {
            console.error('Error navigating to product edit page:', error);
        }
    };

    //Join Table Add Function
    useEffect(() => {
        const fetchSubCategories = async () => {
            try {
                const response = await Axios.get('http://localhost:8000/joinproducts');
                setProducts(response.data);
                console.log(response.data, "212")
            } catch (error) {
                console.error('Error fetching subcategories:', error);
            }
        };
        fetchSubCategories();
    }, []);

    const [searchInput, setSearchInput] = useState('');

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await Axios.get(`http://localhost:8000/home/search?name=${searchInput}`);
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


    return (
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
              onKeyPress={handleKeyPress} 
            />
          </Form>
          </div>
            <h2>Product List</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Category</th>
                        <th>Sub_Category</th>
                        <th>Image</th>
                        <th>Button</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td>{product.ProductName}</td>
                            <td>{product.Price}</td>
                            <th>{product.Description}</th>
                            <td>{product.Quantity}</td>
                            <td>{product.Category?.CategoryName}</td>
                            <td>{product.SubCategory?.SubCategory}</td>
                            <td>
                                <img src={product.Image} alt={product.ProductName} style={{ width: '100px', height: 'auto' }} />
                            </td>
                            <td>
                                <Button onClick={() => handleUpdate(product._id)}>Update</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default ProductList;
