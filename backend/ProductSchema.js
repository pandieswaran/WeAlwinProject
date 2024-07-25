const mongoose = require('mongoose');

const schema = mongoose.Schema;

const productDetailsSchema = new schema({
    ProductName: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Quantity: {
        type: Number,
        required: true
    },
    Category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    SubCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory'
    },                                                       
    Brand: {
        type: String,
        required: true
    },
    Image: {
        type: String,
        required: true                                
    } 
}, {
    timestamps: true
});

const ProductDetails = mongoose.model('ProductDetails', productDetailsSchema);

module.exports = ProductDetails;
