const express = require('express');
const auth = require('../middleware/auth');
const Store = require('../models/Store');
const Subscription = require('../models/Subscription');
const router = express.Router();

// Get vendor dashboard data
router.get('/dashboard', auth, async (req, res) => {
  try {
    // req.user from auth
    const store = await Store.findOne({ vendorId: req.user._id });
    const sub = await Subscription.findOne({ vendorId: req.user._id }).sort({ createdAt: -1 });
    res.json({ store, subscription: sub });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Request store
router.post('/store/request', auth, async (req, res) => {
  try {
    const { domain, dnsConfig } = req.body;
    const store = new Store({ 
      vendorId: req.user._id, 
      domain, 
      dnsConfig 
    });
    await store.save();
    res.json({ msg: 'Store request submitted', store });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
