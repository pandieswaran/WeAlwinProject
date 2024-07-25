const Product = require('../ProductSchema');



const fetchProducts = async(req, res) => {
  try {
    const products = await Product.find()
    .populate('Category','CategoryName')
    .populate('SubCategory','SubCategory')
      .exec();
      res.json(products);
  } catch (err) {
    console.error(err);
  } 
}
module.exports = {
fetchProducts
};