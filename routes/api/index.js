const express = require('express');
const router = express.Router();

const { verifyAPI } = require('../../helpers');

const Customers = require('../../models/customer');

// Authorize Api Route
router.use(verifyAPI);

// API Routes
router.get('/', (req, res) => {
  res.send('Hello from API');
});

// API Routes
router.get('/Customers', (req, res) => {
  Customers.find().then((customers) => {
    res.send(customers);
  });
});

router.get('/Customers/:id', (req, res) => {
  Customers.findById(req.params.id).then((customer) => {
    res.send(customer);
  });
});

router.put('/Customers/:id', async (req, res) => {
  let customer = await Customers.findById(req.params.id);
  customer.points = req.body.points;
  customer.save();
  res.send(customer);
});

module.exports = router;
