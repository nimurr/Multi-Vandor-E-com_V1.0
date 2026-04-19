const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  image: String,
  stock: { type: Number, default: 0 },
  status: { type: String, enum: ['active', 'draft'], default: 'draft' },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
