const request = require('request');

// check if any of the object values are empty
const isParamEmpty = (parameters) => Object.keys(parameters).every((parameter) => parameters[parameter]);

// error thrower for null checks
const nullCheck = (err, obj) => {
  if (!obj) {
    throw err;
  }
};

// api request helpers
const makeRequest = (url, params, method) => {
  const options = { method };
  return new Promise((resolve, reject) => {
    if (method === 'GET') {
      params.key = process.env.API_KEY;
      url += `?${(new URLSearchParams(params)).toString()}`;
    } else {
      options.body = JSON.stringify(params);
    }
    request(url, method, (err, res, body) => {
      if (err) { return reject(err); }
      return resolve(JSON.parse(body));
    });
  });
};

module.exports = { isParamEmpty, nullCheck, makeRequest };
