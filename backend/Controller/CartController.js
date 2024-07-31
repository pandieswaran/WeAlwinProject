// backend/Controller/ProductController.js

const express = require('express');
const cartDetails = require('../CartSchema')
const Product = require('../ProductSchema')


const createCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    let cartItem = await cartDetails.findOne({ userId, productId , status: false});

    let productPrice = await Product.findById(productId)
    const { Price } = productPrice
    
    console.log(Price,"PricePrice")

    if (cartItem) {
      cartItem.Quantity += 1;
      cartItem.totalPrice = Price * cartItem.Quantity;
      await cartItem.save();
    } else {
      const newCart = new cartDetails({
        userId,
        productId,
        Quantity: 1, 
        totalPrice: Price * 1,
      });
      await newCart.save();
    }

    res.status(201).json({ message: 'Product added to cart successfully' });
  } catch (error) {
    console.error('Error creating cart:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


module.exports = {
  createCart
};
