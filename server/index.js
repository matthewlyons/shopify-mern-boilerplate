require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nonce = require('nonce')();
const mongoose = require('mongoose');

const expressLayouts = require('express-ejs-layouts');

const { verifyAuth } = require('../helpers');

const Shop = require('../models/shop');

const {
  PORT,
  MONGO_URI,
  SHOPIFY_APP_KEY,
  SHOPIFY_APP_SCOPE,
  host
} = process.env;

// DB Config
const db = MONGO_URI;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

const app = express();

app.use(express.static('assets'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use('/api', require('../routes/api/'));
app.use('/install', require('../routes/install/'));
app.use('/webhook', require('../routes/webhook/'));

app.get('/*', verifyAuth, async function(req, res) {
  let { shop } = req.query;
  let shopifyStore = await Shop.findOne({ shop });

  if (!shopifyStore) {
    let state = nonce();
    const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_APP_KEY}&scope=${SHOPIFY_APP_SCOPE}&redirect_uri=${host}/install&state=${state}`;
    return res.redirect(installUrl);
  } else if (shopifyStore.scope != SHOPIFY_APP_SCOPE) {
    let state = nonce();
    const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_APP_KEY}&scope=${SHOPIFY_APP_SCOPE}&redirect_uri=${host}/install&state=${state}`;
    res.render('update', {
      installUrl
    });
  } else {
    res.render('app', {
      shop: shopifyStore.shop,
      authToken: shopifyStore.authToken
    });
  }
});

let port = PORT || 5000;

app.listen(port, () => {
  console.log(`Server Running on Port ${port}!`);
});
