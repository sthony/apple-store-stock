const axios = require('axios');
const http = require('http');
const https = require('https');

axios.defaults.timeout = parseInt(process.env.AXIOS_TIMEOUT) || 15000;
axios.defaults.httpAgent = new http.Agent({keepAlive: true});
axios.defaults.httpsAgent = new https.Agent({keepAlive: true});

module.exports = axios;
