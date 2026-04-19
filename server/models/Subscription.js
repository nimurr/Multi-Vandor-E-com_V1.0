const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
  storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' },
  planType: { type: String, enum: ['trial', 'monthly', '6month', 'yearly'], required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ['active', 'expired', 'cancelled'], default: 'active' },
  paymentId: String,
  amount: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
