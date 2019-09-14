const https = require('https');

const httpsAgent = new https.Agent({ keepAlive: true });

const makeGetRequest = queryUrl => {
  return new Promise((resolve, reject) => {
    const req = https.get(queryUrl, resp => {
      let data = '';
      resp.on('data', chunk => (data += chunk)).on('end', () => resolve(JSON.parse(data)));
    });
    req.on('error', reject);
  });
};

const makePostRequest = (urlPath, body, { keepAlive }) => {
  return new Promise((resolve, reject) => {
    const jsonBody = JSON.stringify(body);
    const options = {
      hostname: 'api.telegram.org',
      port: 443,
      path: urlPath,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Content-Length': Buffer.byteLength(jsonBody, 'utf8'),
      },
    };

    if (keepAlive) options.agent = httpsAgent;

    const req = https.request(options, res => {
      let data = '';
      res.setEncoding('utf8');
      res.on('data', chunk => (data += chunk)).on('end', () => resolve(JSON.parse(data)));
    });
    req.write(jsonBody);
    req.on('error', reject);
    req.end();
  });
};

module.exports = { makeGetRequest, makePostRequest };
