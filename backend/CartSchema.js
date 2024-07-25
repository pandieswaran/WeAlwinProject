const mongoose = require('mongoose');

const schema = mongoose.Schema;

const cartSchema = new schema({
  userId: { type: String, required: true },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductDetails'
  },
  Quantity: { type: Number, default: 1 },
  totalPrice: { type: Number, default: 0 },
  status: { type: Boolean, default: false }
}, {
  timestamps: true
});

const cartDetails = mongoose.model('cartDetails', cartSchema);

module.exports = cartDetails;
