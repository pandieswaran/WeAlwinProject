import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import Navigation from '../Components/Nav';
import Axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../Pages/ProductAdd.css';

const schema = yup.object().shape({
  ProductName: yup.string().required('Product Name is required'),
  Price: yup.number().required('Price is required').typeError('Price must be a number'),
  Quantity: yup.number().required('Quantity is required').typeError('Quantity must be a number'),
  Category: yup.string().required('Category is required'),
  SubCategory: yup.string().required('Subcategory is required'),
  Brand: yup.string().required('Brand is required'),
  File: yup.mixed().nullable() // Adjust validation as needed
});


function ProductUpdate() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState('');
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await Axios.get('http://localhost:8000/cat/category');
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
        const response = await Axios.get('http://localhost:8000/sub/subcategory');
        setSubCategories(response.data);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };
    fetchSubCategories();
  }, []);

  const [initialValues, setInitialValues] = useState({
    ProductName: '',
    Price: '',
    Description: '',
    Quantity: '',
    Category: '',
    SubCategory: '',
    Brand: '',
    File: null
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await Axios.get(`http://localhost:8000/product/${productId}`);
        console.log(response.data, "xxxxxxxxxxxxxx")

        const productData = response.data;
        console.log(productData.Category.CategoryName, "yyyyyyyyyyyyy")
        
      


        setInitialValues({
          ProductName: productData.ProductName || '',
          Price: productData.Price || '',
          Description: productData.Description || '',
          Quantity: productData.Quantity || '',
          // Category: productData.Category ? productData.Category._id : '',
          Category: productData.Category.CategoryName,
          SubCategory: productData.SubCategory.SubCategory,
          Brand: productData.Brand || '',
          File: null
        });
        setImage(productData.Image || '');
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append('ProductName', values.ProductName);
      formData.append('Price', values.Price);
      formData.append('Description', values.Description);
      formData.append('Quantity', values.Quantity);
      formData.append('Category', values.Category);
      formData.append('SubCategory', values.SubCategory);
      formData.append('Brand', values.Brand);
      if (values.File) {
        console.log('File to upload:', values.File); // Debugging line
        formData.append('File', values.File);
      }

      const response = await Axios.put(`http://localhost:8000/product/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Product updated successfully:', response.data);
      navigate('/home'); // Redirect to product list page after successful update
    } catch (error) {
      console.error('Error updating product:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navigation />
      <div className="pcenter-form">
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={handleFormSubmit}
          enableReinitialize
        >
          {({ handleSubmit, handleChange, setFieldValue, values, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit} className="pform">
              <h4 className="text-center">Edit Product</h4>

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
                  type="text"
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
                  value={values.Category}
                  onChange={handleChange}
                  isInvalid={touched.Category && !!errors.Category}
                >
                  {/* <option value={Values.Category.CategoryName}/> */}
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
                  {/* <option value="">Select Subcategory...</option> */}
                  {subCategories.map(subcategory => (
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
                <div>
                  <img src={image} alt="Selected" style={{ maxWidth: '100px' }} />
                </div>
              </Form.Group>

              <Button type="submit" className="w-100" variant="primary">
                Update Product
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default ProductUpdate;
