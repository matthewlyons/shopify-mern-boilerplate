const express = require('express');
const router = express.Router();

const { verifyWebhook, calculatePoints } = require('../../helpers');

const Customer = require('../../models/customer');

// Authorize Shopify Webhook
router.use(verifyWebhook);

// Webhook Routes
router.post('/customer/create', (req, res) => {
  let customerName = `${req.body.first_name} ${req.body.last_name}`;
  let shopifyCustomer = new Customer({
    shopify_id: req.body.id,
    name: customerName
  });
  shopifyCustomer
    .save()
    .then(() => {
      res.send('Received Webhook');
    })
    .catch((err) => {
      res.status(400).send('Something went wrong');
    });
});
router.post('/customer/delete', (req, res) => {
  Customer.findOne({ shopify_id: req.body.id })
    .then((customer) => {
      customer.remove();
      res.send('Received Webhook');
    })
    .catch((err) => {
      console.log('No Customer in Database');
      res.send('Received Webhook');
    });
});

router.post('/order/create', (req, res) => {
  let customerID = req.body.customer.id.toString();
  Customer.findOne({ shopify_id: customerID })
    .then((customer) => {
      let newPoints = calculatePoints(req.body.total_price);
      customer.points += newPoints;
      customer.save();
      res.send('Received Webhook');
    })
    .catch((err) => {
      console.log('No Customer in Database');
      res.send('Received Webhook');
    });
});

module.exports = router;
