const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
  domain: { type: String, required: true, unique: true },
  status: { type: String, enum: ['pending', 'approved', 'deployed', 'suspended'], default: 'pending' },
  dnsConfig: { type: String },
  createdAt: { type: Date, default: Date.now },
  deployedAt: Date
});

module.exports = mongoose.model('Store', storeSchema);
