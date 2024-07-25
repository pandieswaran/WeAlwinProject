import React, { useEffect, useState } from 'react';
import Navigation from '../Components/Nav';
import '../Pages/Homepage.css';
import Axios from 'axios';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';

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

    return (
        <div>
            <Navigation />
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
