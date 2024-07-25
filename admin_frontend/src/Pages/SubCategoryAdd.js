import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Table } from 'react-bootstrap';
import Navigation from '../Components/Nav';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SubCategoryAdd() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [newCategoryId, setNewCategoryId] = useState('');
    const [newSubCategoryName, setNewSubCategoryName] = useState('');
    const [currentSubCategoryId, setCurrentSubCategoryId] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await Axios.get('http://localhost:8000/category');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchSubCategories = async () => {
            try {
                const response = await Axios.get('http://localhost:8000/joinsubcategories');
                setSubCategories(response.data);
            } catch (error) {
                console.error('Error fetching subcategories:', error);
            }
        };
        fetchSubCategories();
    }, []);

    const validateForm = () => {
        const newErrors = {};
        if (!newSubCategoryName) {
            newErrors.newSubCategoryName = 'Subcategory name is required';
        }
        if (!newCategoryId) {
            newErrors.newCategoryId = 'Category is required';
        }

        return newErrors;
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!categoryId) newErrors.CategoryId = 'Category is required';
        if (!subCategory) newErrors.SubCategory = 'Subcategory is required';

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        const body = {
            CategoryId: categoryId,
            SubCategory: subCategory,
        };

        try {
            const response = await Axios.post('http://localhost:8000/subcategory', body);
            console.log('Form submitted successfully:', response.data);
            setCategoryId('');
            setSubCategory('');
            navigate('/subcategoryadd');
            window.location.reload();
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setMessage(error.response.data.message);
            } else {
                setMessage('Error submitting form');
            }
        }
    };

    const handleUpdate = (subCategoryId) => {
        setErrors({});
        const subCategoryToUpdate = subCategories.find(sub => sub._id === subCategoryId);
        if (subCategoryToUpdate) {
            setNewCategoryId(subCategoryToUpdate.CategoryId._id);
            setNewSubCategoryName(subCategoryToUpdate.SubCategory);
            setCurrentSubCategoryId(subCategoryId);
            setShowOtpModal(true);
        }
    };

    const resetPasswordHandler = async () => {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await Axios.put(`http://localhost:8000/subcategory/${currentSubCategoryId}`, {
                CategoryId: newCategoryId,
                SubCategory: newSubCategoryName
            });
            console.log('Subcategory updated successfully:', response.data);
            setShowOtpModal(false);
            setNewCategoryId('');
            setNewSubCategoryName('');
            const responseSubCategories = await Axios.get('http://localhost:8000/joinsubcategories');
            setSubCategories(responseSubCategories.data);
        } catch (error) {
            console.error('Error updating subcategory:', error);
        }
    };

    return (
        <>
            <Navigation />
            <div className="pcenter-form">
                <Form noValidate onSubmit={handleFormSubmit} className="pform">
                    <h4 className="text-center">Add Sub Category</h4>

                    <Form.Group controlId="validationCategory" className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            as="select"
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            isInvalid={!!errors.CategoryId}
                        >
                            <option value="">Select Category...</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.CategoryName}
                                </option>
                            ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {errors.CategoryId}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="validationSubCategory" className="mb-3">
                        <Form.Label>Sub Category</Form.Label>
                        <Form.Control
                            type="text"
                            value={subCategory}
                            onChange={(e) => setSubCategory(e.target.value.trim())}
                            isInvalid={!!errors.SubCategory}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.SubCategory}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button className="mx-auto d-block" type="submit">Submit Form</Button>
                    {message && <p>{message}</p>}
                </Form>

                <Modal show={showOtpModal} onHide={() => setShowOtpModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Category and Subcategory</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="validationCategory" className="mb-3">
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={newCategoryId}
                                    onChange={(e) => setNewCategoryId(e.target.value)}
                                    isInvalid={!!errors.newCategoryId}
                                >
                                    <option value="">Select Category...</option>
                                    {categories.map(category => (
                                        <option key={category._id} value={category._id}>
                                            {category.CategoryName}
                                        </option>
                                    ))}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    {errors.newCategoryId}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formNewSubCategoryName" className="mb-3">
                                <Form.Label>Update Sub Category Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={newSubCategoryName}
                                    onChange={(e) => setNewSubCategoryName(e.target.value.trim())}
                                    isInvalid={!!errors.newSubCategoryName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.newSubCategoryName}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowOtpModal(false)}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={resetPasswordHandler}>
                            Update
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

            <div>
                <h2>Subcategory List</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Category Name</th>
                            <th>Subcategory Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subCategories.map((subcategory) => (
                            <tr key={subcategory._id}>
                                <td>{subcategory.CategoryId ? subcategory.CategoryId.CategoryName : 'Loading...'}</td>
                                <td>{subcategory.SubCategory}</td>
                                <td>
                                    <Button onClick={() => handleUpdate(subcategory._id)}>Update</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default SubCategoryAdd;
