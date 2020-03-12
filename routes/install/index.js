const express = require('express');
const router = express.Router();

const axios = require('axios');

const Shop = require('../../models/shop');

const { createWebhook } = require('../../helpers');

const {
  SHOPIFY_APP_KEY,
  SHOPIFY_APP_SECRET,
  SHOPIFY_APP_SCOPE,
  SHOPIFY_APP_NAME
} = process.env;

router.get('/', async (req, res) => {
  const { shop, code } = req.query;
  const accessURL = `https://${shop}/admin/oauth/access_token`;
  const accessPayload = {
    client_id: SHOPIFY_APP_KEY,
    client_secret: SHOPIFY_APP_SECRET,
    code
  };
  let response = await axios.post(accessURL, accessPayload);

  let store = {
    shop,
    authToken: response.data.access_token,
    scope: SHOPIFY_APP_SCOPE
  };

  await Shop.findOneAndUpdate(
    { shop },
    { $set: store },
    { new: true, upsert: true }
  );

  await createWebhook(
    'customers/create',
    '/webhook/customer/create',
    response.data.access_token,
    shop
  );
  await createWebhook(
    'customers/delete',
    '/webhook/customer/delete',
    response.data.access_token,
    shop
  );
  await createWebhook(
    'orders/create',
    '/webhook/order/create',
    response.data.access_token,
    shop
  );

  res.redirect(`https://${shop}/admin/apps/${SHOPIFY_APP_NAME}`);
});

module.exports = router;
