const https = require('https');

const makeGetRequest = url => {
  return new Promise((resolve, reject) => {
    https
      .get(url, resp => {
        let data = '';
        resp.on('data', chunk => (data += chunk)).on('end', () => resolve(JSON.parse(data)));
      })
      .on('error', reject);
  });
};

const makePostRequest = (urlPath, body) => {
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

if (require.main === module) {
  makeGetRequest('https://jsonplaceholder.typicode.com/todos/1').then(data => {
    console.log(data);
  });
}
