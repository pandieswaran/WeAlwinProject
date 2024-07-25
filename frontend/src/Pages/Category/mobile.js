// import React, { useState, useEffect } from 'react';
// import Card from 'react-bootstrap/Card';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import axios from 'axios';
// import Navigation from '../../Components/Navigation';
// import { useNavigate, useParams } from 'react-router-dom';

// function Mobile() {
//     const navigate = useNavigate()
//     const [products, setProducts] = useState([]);
//     const {category,subCategory}=useParams();

//     console.log("cat",category)

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8000/category/${category}/subcat`);
//                 setProducts(response.data);
//                 console.log(response.data, "111");
//             } catch (error) {
//                 console.error('Error fetching products:', error);
//             }
//         };

//         fetchProducts();
//     }, []);


//     const handleRedirect = (productId) => {
//         console.log(productId)
//         navigate(`/${productId}`);
//     };

//     return (
//         <div>
//             <Navigation />
//             <Container className="product-container">
//                 <h2>Mobile Phones</h2>
//                 <Row xs={1} md={2} lg={3} xl={4} className="g-4">
//                     {products.map((product, index) => {
//                         return (
//                             <Col key={index}>
//                                 <Card style={{ width: '18rem', height: '100%', marginBottom: '20px' }}>
//                                     <Card.Img variant="top" src={product.Image} style={{ height: '200px', objectFit: 'contain' }} />
//                                     <Card.Body>
//                                         <Card.Title
//                                             onClick={() => handleRedirect(product?._id)}
//                                             style={{ cursor: 'pointer' }}>
//                                             {product.ProductName.length > 20 ? `${product.ProductName.substring(0, 20)}...` : product.ProductName}
//                                         </Card.Title>
//                                         <p>
//                                             Description:{' '}
//                                             {product.Description.length > 20
//                                                 ? `${product.Description.substring(0, 40)}...`
//                                                 : product.Description}
//                                         </p>
//                                         <p>Price: ₹{product.Price}</p>
//                                     </Card.Body>
//                                 </Card>
//                             </Col>
//                         );
//                     })}
//                 </Row>
//             </Container>
//         </div>
//     );
// }

// export default Mobile;
