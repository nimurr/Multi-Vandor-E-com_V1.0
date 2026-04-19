const express = require('express');
const auth = require('../middleware/auth');
const { createPaymentIntent } = require('../utils/payment');
const router = express.Router();

router.post('/intent', auth, createPaymentIntent);

module.exports = router;
