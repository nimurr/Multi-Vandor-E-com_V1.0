const Subscription = require('../models/Subscription');

const requireActiveSubscription = async (req, res, next) => {
  try {
    // Assume req.vendorId from auth middleware
    const subs = await Subscription.findOne({ vendorId: req.vendorId, status: 'active' })
      .sort({ createdAt: -1 });
    if (!subs || new Date(subs.endDate) < new Date()) {
      return res.status(403).json({ msg: 'Active subscription required' });
    }
    req.subscription = subs;
    next();
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = requireActiveSubscription;
