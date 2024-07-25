import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Table, FormText } from 'react-bootstrap';
import Navigation from '../Components/Nav';
import Axios from 'axios';

function CategoryAdd() {
  const [categoryName, setCategoryName] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const validateForm = (categoryName) => {
    const newErrors = {};
    if (!categoryName) {
      newErrors.categoryName = 'Category Name is required';
    }
    return newErrors;
  };

  const fetchCategories = async () => {
    try {
      const response = await Axios.get('http://localhost:8000/cat/category');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleInputChange = (event) => {
    setCategoryName(event.target.value.trim());
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const newErrors = validateForm(categoryName);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await Axios.post('http://localhost:8000/createCategory', {
        CategoryName: categoryName,
      });
      console.log('Form submitted successfully:', response.data);
      setCategoryName('');
      setError('');
      setErrors({});
      fetchCategories();
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Error submitting form. Please try again.');
    }
  };

  const handleUpdate = (categoryId) => {
    setErrors({});
    const categoryToUpdate = categories.find((category) => category._id === categoryId);
    if (categoryToUpdate) {
      setNewCategoryName(categoryToUpdate.CategoryName);
      setCurrentCategoryId(categoryId);
      setShowOtpModal(true);
    }
  };

  const resetPasswordHandler = async () => {
    const validationErrors = validateForm(newCategoryName);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await Axios.put(`http://localhost:8000/category/${currentCategoryId}`, {
        CategoryName: newCategoryName,
      });
      console.log('Category updated successfully');
      setShowOtpModal(false);
      setNewCategoryName('');
      fetchCategories();
    } catch (error) {
      console.error('Error updating category:', error);
      setError('Error updating category. Please try again.');
    }
  };

  return (
    <>
      <Navigation />
      <div className="pcenter-form">
        <Form noValidate onSubmit={handleFormSubmit} className="pform">
          <h4 className="text-center">Add Category</h4>
          <Form.Group controlId="validationCategoryName" className="mb-3">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              name="CategoryName"
              value={categoryName}
              onChange={handleInputChange}
              required
              isInvalid={!!errors.categoryName}
            />
            {errors.categoryName && <FormText style={{ color: 'red' }}>{errors.categoryName}</FormText>}
          </Form.Group>
          {error && <div className="text-danger mb-3">{error}</div>}
          <Button className="mx-auto d-block" type="submit">
            Submit Form
          </Button>
        </Form>
      </div>

      <Modal show={showOtpModal} onHide={() => setShowOtpModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Category Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNewCategoryName" className="mb-3">
              <Form.Label>New Category Name</Form.Label>
              <Form.Control
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value.trim())}
                required
                isInvalid={!!errors.categoryName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.categoryName}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowOtpModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={resetPasswordHandler}>
            Update Name
          </Button>
        </Modal.Footer>
      </Modal>

      <div>
        <h2>Category List</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td>{category.CategoryName}</td>
                <td>
                  <Button onClick={() => handleUpdate(category._id)}>Update</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default CategoryAdd;
