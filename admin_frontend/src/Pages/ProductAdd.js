import { Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import Navigation from '../Components/Nav';
import '../Pages/ProductAdd.css';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const schema = yup.object().shape({
  ProductName: yup.string().required('Product Name is required'),
  Price: yup.number().required('Price is required').typeError('Price must be a number'),
  Description: yup.string().required('Description is required'),
  Quantity: yup
    .number()
    .integer('Quantity must be an integer')
    .required('Quantity is required')
    .positive('Quantity must be greater than zero'),
  Category: yup.string().required('Category is required'),
  SubCategory: yup.string().required('Subcategory is required'),
  Brand: yup.string().required('Brand is required'),
  File: yup.mixed().required('File is required')
});

function ProductAdd() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');


  // Fetch Categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await Axios.get('http://localhost:8000/cat/category');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Fetch Subcategories
  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await Axios.get('http://localhost:8000/sub/subcategory');
        setSubCategories(response.data);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };

    fetchSubCategories();
  }, []);

  console.log([subCategories])

  const handleFormSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    formData.append('ProductName', values.ProductName);
    formData.append('Price', values.Price);
    formData.append('Description', values.Description);
    formData.append('Quantity', values.Quantity);
    formData.append('Category', values.Category);
    formData.append('SubCategory', values.SubCategory);
    formData.append('Brand', values.Brand);
    formData.append('image', values.File);

    try {
      const response = await Axios.post('http://localhost:8000/createproduct/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Form submitted successfully:', response.data);
      resetForm(); // Reset the form after successful submission
      navigate('/home');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };


  return (
    <>
      <Navigation />
      <Formik
        initialValues={{
          ProductName: '',
          Price: '',
          Description: '',
          Quantity: '',
          Category: '',
          SubCategory: '',
          Brand: '',
          File: null,
        }}
        validationSchema={schema}
        onSubmit={handleFormSubmit}
      >
        {({ handleSubmit, handleChange, values, touched, errors, setFieldValue }) => (
          <div className="pcenter-form">
            <Form noValidate onSubmit={handleSubmit} className="pform">
              <h4 className="text-center">Product Add Form</h4>

              <Form.Group controlId="validationProductName" className="mb-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  name="ProductName"
                  value={values.ProductName}
                  onChange={handleChange}
                  isInvalid={touched.ProductName && !!errors.ProductName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.ProductName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="validationPrice" className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  name="Price"
                  value={values.Price}
                  onChange={handleChange}
                  isInvalid={touched.Price && !!errors.Price}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.Price}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="validationDescription" className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="Description"
                  value={values.Description}
                  onChange={handleChange}
                  isInvalid={touched.Description && !!errors.Description}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.Description}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="validationQuantity" className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  name="Quantity"
                  value={values.Quantity}
                  onChange={handleChange}
                  isInvalid={touched.Quantity && !!errors.Quantity}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.Quantity}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="validationCategory" className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  name="Category"
                  value={values.Category.CategoryName}
                  onChange={(e) => {
                    handleChange(e);
                    setSelectedCategory(e.target.value); // Update selected category
                    setFieldValue('SubCategory', ''); // Reset SubCategory when Category changes
                  }}
                  isInvalid={touched.Category && !!errors.Category}
                >
                  <option value="">Select Category...</option>
                  {categories.map(category => (
                    <option key={category._id} value={category._id}>
                      {category.CategoryName}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.Category}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="validationSubCategory" className="mb-3">
                <Form.Label>Subcategory</Form.Label>
                <Form.Control
                  as="select"
                  name="SubCategory"
                  value={values.SubCategory}
                  onChange={handleChange}
                  isInvalid={touched.SubCategory && !!errors.SubCategory}
                >
                  <option value="">Select Subcategory...</option>
                  {subCategories
                    .filter(subcategory => subcategory.CategoryId === selectedCategory) // Filter subcategories based on selected category
                    .map(subcategory => (
                      <option key={subcategory._id} value={subcategory._id}>
                        {subcategory.SubCategory}
                      </option>
                    ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.SubCategory}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="validationBrand" className="mb-3">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type="text"
                  name="Brand"
                  value={values.Brand}
                  onChange={handleChange}
                  isInvalid={touched.Brand && !!errors.Brand}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.Brand}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="validationFile" className="mb-3">
                <Form.Label>File</Form.Label>
                <Form.Control
                  type="file"
                  name="File"
                  accept="image/*"
                  onChange={(e) => setFieldValue('File', e.target.files[0])}
                  isInvalid={touched.File && !!errors.File}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.File}
                </Form.Control.Feedback>
              </Form.Group>

              <Button className="mx-auto d-block" type="submit">Submit Form</Button>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
}

export default ProductAdd;
