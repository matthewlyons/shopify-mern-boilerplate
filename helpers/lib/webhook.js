const axios = require('axios');

module.exports = {
  createWebhook(topic, route, token, shop) {
    let config = {
      headers: {
        'X-Shopify-Access-Token': token
      }
    };
    let webhookRequest = {
      webhook: {
        topic,
        address: process.env.host + route,
        format: 'json'
      }
    };
    let webhookURL = `https://${shop}/admin/api/2020-01/webhooks.json`;
    axios
      .post(webhookURL, webhookRequest, config)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
