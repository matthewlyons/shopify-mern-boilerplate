const CryptoJS = require('crypto-js');
const querystring = require('querystring');

module.exports = {
  verifyAuth(req, res, next) {
    let { query } = req;
    let { hmac } = query;
    const map = Object.assign({}, query);
    delete map['hmac'];
    const str = querystring.stringify(map);

    if (str) {
      let calculatedHMAC = CryptoJS.HmacSHA256(
        str,
        process.env.SHOPIFY_APP_SECRET
      ).toString();
      if (calculatedHMAC == hmac) {
        next();
      } else {
        return res.status(401).send('Unauthorized');
      }
    } else {
      return res.status(401).send('Unauthorized');
    }
  },
  verifyAPI(req, res, next) {
    console.log('Hello from api verification');
    next();
  },
  verifyWebhook(req, res, next) {
    console.log('Hello from webhook verification');
    next();
  }
};
