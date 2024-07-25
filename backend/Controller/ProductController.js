// backend/Controller/ProductController.js

const express = require('express');
const multer = require('multer');
const Product = require('../ProductSchema');

// Set up Multer for file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify your upload directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Use a unique filename
    }
});

const upload = multer({ storage: storage });

const createProduct = async (req, res) => {
    try {
        const { ProductName, Price, Description, Quantity, Category, SubCategory, Brand } = req.body;
        
        // Ensure Description field is provided
        if (!Description) {
            return res.status(400).json({ message: 'Description is required' });
        }
        
        // Ensure req.file exists and is defined
        if (!req.file) {
            return res.status(400).json({ message: 'No image file uploaded' });
        }

        const image = req.file.path;
        console.log('Uploaded image path:', image);

        const newProduct = new Product({
            ProductName,
            Price,
            Description,
            Quantity,
            Category,
            SubCategory,
            Brand,
            Image: `http://localhost:8000/${image}` // Adjust if necessary based on your server setup
        });

        await newProduct.save();
        res.status(201).json({ message: 'Product created successfully' });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    createProduct,
    upload
};
