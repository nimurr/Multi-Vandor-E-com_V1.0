require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/multi_vendor_saas')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));



// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/vendor', require('./routes/vendor'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/payment', require('./routes/payment'));

app.get('/', (req, res) => {
  res.json({ message: 'Multi-Vendor SaaS Server Running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
