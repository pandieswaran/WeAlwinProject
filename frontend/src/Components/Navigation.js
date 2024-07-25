// import React from 'react';
// import Nav from 'react-bootstrap/Nav';
// import Button from 'react-bootstrap/Button';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import { useNavigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import Axios from 'axios';
// import '../Components/Navigation.css';

// function Navigation() {
//     const token = localStorage.getItem('token');
//     const [subCategories, setSubCategories] = useState([]);
//     const Navigate = useNavigate();

//     // Fetch Subcategories from the backend
//     useEffect(() => {
//         const fetchSubCategories = async () => {
//             try {
//                 const response = await Axios.get('http://localhost:8000/joinsubcategories');
//                 setSubCategories(response.data);
//             } catch (error) {
//                 console.error('Error fetching subcategories:', error);
//             }
//         };
//         fetchSubCategories();
//     }, []);


//     console.log([subCategories],"4545")

//     const handleNavigate = (path) => {
//         Navigate(path);
//     };

//     const handleLogout = () => {
//         toast.error("Logged out successfully!");
//         localStorage.removeItem('token');
//         localStorage.removeItem('userid');
//         Navigate('/login');
//     };

//     return (
//         <div className="unique-nav-container">
//             <Nav className="unique-nav" activeKey="/home">
//                 <Nav.Item>
//                     <Nav.Link href="/home">Shopify.IN</Nav.Link>
//                 </Nav.Item>
//                 <NavDropdown title="Categories" id="basic-nav-dropdown">
//                     {categories.map(category => (
//                         <NavDropdown.Item key={category._id}>
//                             {category.CategoryName}
//                         </NavDropdown.Item>
//                     ))}
//                 </NavDropdown>
//                 <button
//                     style={{ marginLeft: '800px' }}
//                     onClick={() => handleNavigate('/cart')}
//                     className="custom-button1"
//                 >
//                     Cart
//                 </button>
//                 {token ? (
//                     <div className="ms-auto ">
//                         <NavDropdown
//                             title="Profile"
//                             id="profile-dropdown"
//                         >
//                             <Button
//                                 onClick={() => handleNavigate('/profile_update')}
//                                 variant="primary"
//                                 className="custom-button"
//                             >
//                                 Update
//                             </Button>
//                             <NavDropdown.Divider />
//                             <Button
//                                 onClick={handleLogout}
//                                 variant="primary"
//                                 className="custom-button"
//                             >
//                                 Log Out
//                             </Button>
//                         </NavDropdown>
//                     </div>
//                 ) : (
//                     <div className="ms-auto">
//                         <Button
//                             onClick={() => handleNavigate('/login')}
//                             variant="primary"
//                             className="custom-button"
//                         >
//                             Log In
//                         </Button>
//                     </div>
//                 )}
//             </Nav>
//         </div>
//     );
// }

// export default Navigation;

import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Axios from 'axios';
import '../Components/Navigation.css';

function Navigation() {
    const token = localStorage.getItem('token');
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const navigate = useNavigate();

    // Fetch Categories from the backend
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await Axios.get('http://localhost:8000/cat/category');
                console.log('Categories data:', response.data);
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    console.log(categories, "5646546465465464")

    useEffect(() => {
        const fetchSubCategories = async () => {
            try {
                const response = await Axios.get('http://localhost:8000/sub/subcategory');
                console.log('Categories data:', response.data);
                setSubCategories(response.data);
            } catch (error) {
                console.error('Error fetching subcategories:', error);
            }
        };
        fetchSubCategories();
    }, []);

    console.log(subCategories, "555555554545454545454")

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleLogout = () => {
        toast.error("Logged out successfully!");
        localStorage.removeItem('token');
        localStorage.removeItem('userid');
        navigate('/home');
    };

    // Organize subcategories by category
    const categorizedSubCategories = categories.map(category => ({
        ...category,
        subCategories: subCategories.filter(sub => sub.CategoryId === category._id)
    }));

    return (
        <div className="unique-nav-container">
            <Nav className="unique-nav" activeKey="/home">
                <Nav.Item>
                    <Nav.Link href="/home">Shopify.IN</Nav.Link>x
                </Nav.Item>
                {categorizedSubCategories.map(category => (
                    <NavDropdown key={category._id} title={category.CategoryName} id={`category-${category._id}`}>
                        {category.subCategories.map(subcategory => (
                            <NavDropdown.Item
                                key={subcategory._id}
                                onClick={() => handleNavigate(`/products/${subcategory.SubCategory}`)}
                            >
                                {subcategory.SubCategory}
                            </NavDropdown.Item>
                        ))}
                    </NavDropdown>
                ))}

                {token ? (
                    <>
                        <button
                            style={{ marginLeft: '500px', width: '150px', height: '45px', backgroundColor: (255, 255, 255, 0.8) }}
                            onClick={() => handleNavigate('/cart')}
                            className="custom-button1"
                        >
                            Cart
                        </button>
                        <div className="ms-auto">
                            <NavDropdown title="Profile" id="profile-dropdown">
                                <Button
                                    onClick={() => handleNavigate('/profile_update')}
                                    variant="primary"
                                    className="custom-button"
                                >
                                    Update
                                </Button>
                                <NavDropdown.Divider />
                                <Button
                                    onClick={handleLogout}
                                    variant="primary"
                                    className="custom-button"
                                >
                                    Log Out
                                </Button>
                            </NavDropdown>
                        </div>
                    </>
                ) : (
                    <div className="ms-auto">
                        <Button
                            onClick={() => handleNavigate('/login')}
                            variant="primary"
                            className="custom-button"
                        >
                            Log In
                        </Button>
                    </div>
                )}
            </Nav>
        </div>
    );
}

export default Navigation;
