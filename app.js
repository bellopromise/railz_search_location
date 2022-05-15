const express = require('express');
const createError = require('http-errors');
const route = require('./router');

require('dotenv').config();

const app = express();

app.use('/', route);

app.use(async (req, res, next) => {
  next(createError.NotFound('Route does not exist'));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status,
      message: err.message,
    },
  });
});

module.exports = app;
