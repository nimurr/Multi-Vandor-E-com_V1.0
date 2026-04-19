const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (req, res) => {
  try {
    const { amount, vendorId } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // cents
      currency: 'usd',
      metadata: { vendorId }
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ msg: 'Payment error' });
  }
};

module.exports = { createPaymentIntent };
