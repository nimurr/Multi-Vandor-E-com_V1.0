const cron = require('node-cron');
const Subscription = require('./models/Subscription');
const Store = require('./models/Store');
const nodemailer = require('nodemailer');

// Run daily at midnight
cron.schedule('0 0 * * *', async () => {
  console.log('Running subscription expiry check');
  const expiredSubs = await Subscription.find({
    status: 'active',
    endDate: { $lt: new Date() }
  });

  for (const sub of expiredSubs) {
    sub.status = 'expired';
    await sub.save();

    const store = await Store.findOne({ _id: sub.storeId });
    if (store) {
      store.status = 'suspended';
      await store.save();
    }

    // Send email notification (configure transporter)
    console.log(`Expired subscription for vendor ${sub.vendorId}`);
  }
});

module.exports = cron;
