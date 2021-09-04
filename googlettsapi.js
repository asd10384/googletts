
require('dotenv').config();
const fs = require('fs');

module.exports = {
  getkeyfile: function () {
    var option = {
      "type": process.env.GOOGLE_TYPE,
      "project_id": process.env.PROJECT_ID,
      "private_key_id": process.env.PRIVATE_KEY_ID,
      "private_key": process.env.PRIVATE_KEY.replace(/\\n/gm,'\n'),
      "client_email": process.env.CLIENT_EMAIL,
      "client_id": process.env.CLIENT_ID,
      "auth_uri": process.env.AUTH_URL,
      "TOKEN_uri": process.env.TOKEN_URL,
      "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL,
      "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL
    };
    fs.writeFileSync(`googlettsapi.json`, JSON.stringify(option).replace(/\{/g,'{\n').replace(/\}/g,'\n}').replace(/\,/g, ',\n'));
  }
};
