const express = require('express');
const auth = require('../middleware/auth');
const Store = require('../models/Store');
const Subscription = require('../models/Subscription');
const User = require('../models/User');
const router = express.Router();

// Middleware to check admin
const adminAuth = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Admin access required' });
  next();
};

// List store requests
router.get('/stores/requests', auth, adminAuth, async (req, res) => {
  const stores = await Store.find({ status: 'pending' }).populate('vendorId');
  res.json(stores);
});

// Approve & deploy store
router.post('/stores/:id/approve', auth, adminAuth, async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);
    if (!store) return res.status(404).json({ msg: 'Store not found' });
    
    store.status = 'deployed';
    store.deployedAt = new Date();
    await store.save();

    // Start trial subscription
    const trialEnd = new Date();
    trialEnd.setMonth(trialEnd.getMonth() + 1);
    const trialSub = new Subscription({
      vendorId: store.vendorId,
      storeId: store._id,
      planType: 'trial',
      startDate: new Date(),
      endDate: trialEnd,
      status: 'active'
    });
    await trialSub.save();

    res.json({ msg: 'Store deployed, trial started', store });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
