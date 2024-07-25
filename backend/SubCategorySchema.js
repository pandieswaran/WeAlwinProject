// models/SubCategory.js
const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    CategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    SubCategory: {
        type: String, 
        required: true,
        unique: true // Ensures the SubCategory field is unique across all documents
    }
});

const SubCategory = mongoose.model('SubCategory', subCategorySchema);
module.exports = SubCategory;
