const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { createProduct, upload } = require('../Controller/ProductController'); // Correct import for both the function and the upload configuration
const { LoginPage } = require('../Controller/LoginPage');
const { SignupPage } = require('../Controller/SignupPage');
const Product = require('../ProductSchema');
const User = require('../SignupSchema')
const Cart = require('../CartSchema')
const Category = require('../CategorySchema')
const subCategory = require('../SubCategorySchema')

const authenticateToken = require('../Token/AuthenticationToken');
const { ForgotPassword } = require('../Controller/ForgetPassword')
const { Verify_OTP } = require('../Controller/VerifyOtp')
const { createCart } = require('../Controller/CartController')
const { createCategory } = require('../Controller/CategoryController')
const { createSubCategory, getJoinedSubCategories } = require('../Controller/SubCategoryController')
const { fetchProducts } = require('../Controller/ProductJoinCategorySub')



// Login route
router.post('/login', async (req, res) => {
  await LoginPage(req, res);
});

// Product creation route
router.post('/createproduct', upload.single('image'), async (req, res) => {
  await createProduct(req, res);
  console.log(req.file); // Check if req.file contains the uploaded file
});

// Add Category in Table/ Database
router.post('/createCategory', async (req, res) => {
  await createCategory(req, res);
  console.log(req.file); // Check if req.file contains the uploaded file
});

router.post('/subcategory', createSubCategory);
router.get('/joinsubcategories', getJoinedSubCategories);
router.get('/joinproducts', fetchProducts);

//using Get the Value using SubCategory
router.get('/products/:subCategory', async (req, res) => {
  const subCategoryName = req.params.subCategory.trim(); // Access and trim the parameter
  // console.log(subCategoryName, "55555");

  try {
    // Find the subcategory by name
    const sub = await subCategory.findOne({ SubCategory: subCategoryName });
    // console.log(sub, "sub");

    if (!sub) {
      return res.status(404).json({ message: 'SubCategory not found' });
    }

    // Use the subcategory ID to find products
    const products = await Product.find({ SubCategory: sub._id });
    console.log(products, "products");

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found for this subcategory' });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products by subcategory:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Product Cart route (POST)
router.post('/cart', async (req, res) => {
  await createCart(req, res);
});

// Product Cart Route (GET)
router.get('/cart/:userId', async (req, res) => {
  const userId = req.params.userId;
  console.log(userId,"userIduserIduserId")
  try {
    // Fetch cart items for the user
    const cartItems = await Cart.find({ userId })
    .populate('productId', 'ProductName Price Image Description')
    res.json(cartItems);
    console.log(cartItems, "cartItemscartItems")
  } catch (error) {
    console.error('Error fetching cart items and products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Product Cart Route (GET)
router.delete('/cart/del/:id', async (req, res) => {
  const productId = req.params.id
  console.log(productId,"productIdproductId")
  try {
    // Fetch cart items for the user
    const cartItems = await Cart.findByIdAndDelete( productId )
    res.json(cartItems);
    console.log(cartItems, "cartItemscartItems")
  } catch (error) {
    console.error('Error fetching  products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Signup route
router.post('/signup', async (req, res) => {
  await SignupPage(req, res);
});

// Forgot_password Route
router.post('/forgot-password', async (req, res) => {
  await ForgotPassword(req, res);
});

// OTP Verification
router.post('/verify-otp', async (req, res) => {
  await Verify_OTP(req, res);
});

router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
    console.log(products)
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//user getting
router.get('/user', async (req, res) => {
  try {
    const user = await User.find(); // Assuming Product is your Mongoose model
    res.json(user);
    console.log(user)
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//using Product ID
router.get('/:productId', async (req, res) => {
  const productId = req.params.productId;
  console.log(productId, "55555")
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//using Product ID
router.get('/product/:productId', async (req, res) => {
  console.log(req.params, "req.paramsreq.params")
  const productd = req.params.productId;
  console.log(productd, "44444")
  try {
    const product = await Product.findById(productd)
      .populate('Category', 'CategoryName')
      .populate('SubCategory','SubCategory')
      .exec();
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//using Product ID -- Frontend
router.get('/productf/:id', async (req, res) => {
  console.log(req.params, "req.paramsreq.params")
  const productd = req.params.id;
  console.log(productd, "66666")
  try {
    const product = await Product.findById(productd);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//using Category 
router.get('/cat/category', async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).send('Server error');
  }
});


//Using Category By ID 
router.get('/category/:categoryid', async (req, res) => {
  try {
    const categoryId = req.params.categoryid;
    const category = await Category.findByIdAndUpdate(categoryId); // Assuming Product is your Mongoose model
    res.json(category);
    console.log(category)
  } catch (error) {
    console.error('Error fetching category data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//Using Category By ID 
router.get('/subcategory/:SubCategory', async (req, res) => {
  try {
    const SubCategory = req.params.SubCategory;
    const sub = await subCategory.findById(SubCategory); // Assuming Product is your Mongoose model
    res.json(sub);
    console.log(sub)
  } catch (error) {
    console.error('Error fetching category data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


//using subCategory 
router.get('/sub/subcategory', async (req, res) => {
  try {

    const subCategories = await subCategory.find();
    res.json(subCategories);
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    res.status(500).send('Server error');
  }
});


//Update Category Using Category ID And Category Fields
router.put('/category/:categoryid', async (req, res) => {
  const categoryId = req.params.categoryid;
  console.log(categoryId, "Updating Category");
  const updateFields = req.body
  try {

    // Perform the update
    const updatedCategory = await Category.findByIdAndUpdate(categoryId, updateFields, { new: true, runValidators: true });

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ message: 'Category updated successfully', updatedCategory });
  } catch (error) {
    console.error('Error updating Category:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//Update Category Using Category ID And Category Fields
router.put('/subcategory/:subcategoryid', async (req, res) => {
  const { subcategoryid } = req.params;
  const { CategoryId, SubCategory } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(subcategoryid)) {
      return res.status(400).send({ message: 'Invalid subcategory ID' });
    }

    if (!mongoose.Types.ObjectId.isValid(CategoryId)) {
      return res.status(400).send({ message: 'Invalid category ID' });
    }

    const updatedSubCategory = await subCategory.findByIdAndUpdate(
      subcategoryid,
      { CategoryId, SubCategory },
      { new: true }
    );

    if (!updatedSubCategory) {
      return res.status(404).send({ message: 'Subcategory not found' });
    }

    res.send(updatedSubCategory);
  } catch (error) {
    console.error('Error updating subcategory:', error);
    res.status(500).send({ message: 'Server error' });
  }
});


//Update The Already Exisiting Product Name or Any Other Data
router.put('/product/:productId', upload.single('File'), async (req, res) => {
  const productId = req.params.productId;
  const { ProductName, Price, Description, Quantity, Category, SubCategory, Brand } = req.body;

  try {
    // Find product by ID and update fields
    const updateFields = {
      ProductName,
      Price,
      Description,
      Quantity,
      Category,
      SubCategory,
      Brand
    };

    if (req.file) {
      updateFields.Image = `http://localhost:8000/${req.file.path}`; // Adjust based on server setup
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, updateFields, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product updated successfully', updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//Profile Getting
router.get('/users/:userId', async (req, res) => {
  const userId = req.params.userId;
  console.log(userId)
  try {
    const user = await User.findById(userId).select('-password');;
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching User by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//Profile Updating
router.put('/users/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'user not found' });
    }
    res.json({ message: 'User updated successfully', updatedUser });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//Admin Home
router.route('/home').get(authenticateToken, (req, res) => {
  res.json({ message: "Protected route accessed", user: req.user });
});

//Search Bar and get the value
// Search products by name
router.get('/home/search', async (req, res) => {
  const { name } = req.query;
  try {
    // Case-insensitive search using RegExp
    const products = await Product.find({
      ProductName: { $regex: new RegExp(name, 'i') }
    });
    res.json(products);
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// //User Home
// router.route('/userhome').get(authenticateToken, (req, res) => {
//     res.json({ message: "Protected route accessed", user: req.user });
//   });

// // Using subCategory By ID
// router.get('/products/:subcategoryId', async (req, res) => {
//   try {
//     let { subcategoryId } = req.params;
//     subcategoryId = subcategoryId.trim(); // Remove extra whitespace or characters

//     // Validate if subcategoryId is a valid ObjectId
//     if (!mongoose.Types.ObjectId.isValid(subcategoryId)) {
//       return res.status(400).json({ message: 'Invalid subcategory ID format' });
//     }

//     console.log('Fetching products for subcategoryId:', subcategoryId);

//     const products = await Product.find({ SubCategory: mongoose.Types.ObjectId(subcategoryId) });

//     if (products.length === 0) {
//       return res.status(404).json({ message: 'No products found' });
//     }

//     res.json(products);
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// // Route to get a specific product based on Category, SubCategory, and ProductID
// router.get('/:category/:subCategory/:productId', async (req, res) => {
//   const { category, subCategory, productId } = req.params;
//   try {

//     const product = await Product.findOne({ Category: category, SubCategory: subCategory, _id: productId });
//     if (product) {
//       res.json(product);
//       console.log(product);
//     } else {
//       res.status(404).json({ message: 'Product not found' });
//     }
//   } catch (error) {
//     console.error('Error fetching product:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// router.get('/category/:categoryId/subcategory/:subcategoryId', async (req, res) => {
//   try {
//     const { categoryid, subcategoryid } = req.params
//     const products = await Product.find({ Category: categoryid, SubCategory: subcategoryid });
//     res.json(products);
//     console.log(products);
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });


module.exports = router;
