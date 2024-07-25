const Category = require('../CategorySchema');

const createCategory = async (req, res) => {
  try {
    const { CategoryName } = req.body; // Destructure CategoryName from req.body

    // Check if the category already exists
    const existingCategory = await Category.findOne({ CategoryName });
    if (existingCategory) {
      return res.status(400).send('Category name already exists');
    }

    const newCategory = new Category({ CategoryName });
    await newCategory.save();
    res.status(201).send('Category created successfully');
  } catch (error) {
    if (error.code === 11000) { // Duplicate key error code
      res.status(400).send('Category name already exists');
    } else {
      console.error('An error occurred:', error);
      res.status(500).send('Internal server error');
    }
  }
};

module.exports = { createCategory };



































// const Category = require('../CategorySchema');

// const createCategory = async (req, res) => {
//   try {
//     const CategoryName = req.body.CategoryName;
//     const newCategory = new Category({ CategoryName });
//     await newCategory.save();
//     res.status(201).send('Category created successfully');
//   } catch (error) {
//     if (error.code === 11000) { // Duplicate key error code
//       console.log('Already Category Name Have in Database');
//     } else {
//       console.log('An error occurred:', error);
//     }
//   }
// };

// module.exports = { createCategory };



