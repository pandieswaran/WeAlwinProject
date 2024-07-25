const SubCategory = require('../SubCategorySchema');
const mongoose = require('mongoose');

const createSubCategory = async (req, res) => {
  const { CategoryId, SubCategory: subCategory } = req.body;
  console.log('Received data:', req.body); // Log the incoming data

  // Validate CategoryId
  if (!mongoose.Types.ObjectId.isValid(CategoryId)) {
    return res.status(400).json({ message: 'Invalid CategoryId' });
  }

  try {
    const newSubCategory = new SubCategory({
      CategoryId: new mongoose.Types.ObjectId(CategoryId),
      SubCategory: subCategory // Ensure this is the correct value
    });

    console.log('New subcategory:', newSubCategory); // Log the object to be saved

    await newSubCategory.save();
    res.status(201).json({ message: 'Subcategory created successfully' });
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



//Two Table Join 
const getJoinedSubCategories = async (req, res) => {
    try {
        const subcategories = await SubCategory.find({})
            .populate('CategoryId', 'CategoryName')
            .exec();
        res.json(subcategories);
    } catch (err) {
        console.error('Error fetching joined subcategories:', err);
        res.status(500).json({ message: 'Server Error' });
    }
};


module.exports = {
    createSubCategory,
    getJoinedSubCategories
};
