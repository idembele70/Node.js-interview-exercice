const https = require('https');

module.exports = async function ping(url) {
  return new Promise(resolve => {
    const startTime = Date.now();
    const apiUrl = new URL(url);
    const options = {
    hostname: apiUrl.hostname,
    port: 443,
    path: apiUrl.pathname + apiUrl.search,
    method: 'GET',
    rejectUnauthorized: true,
    timeout: 10 * 1000,
  }
  const req = https.request(options, (res) => {
    const duration = Date.now() - startTime;
    resolve(`✅ ${res.statusCode} ${res.statusMessage} (${apiUrl.host}) in ${duration}ms`)
  });
  req.end() 
})
}