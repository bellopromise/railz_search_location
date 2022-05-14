const express= require('express');
const createError = require('http-errors');


require('dotenv').config();
const app = express();


app.use(async(req, res, next)=>{
    next(createError.NotFound("Route does not exist"));
});

app.use((err, req, res, next)=>{
    res.status = err.status;
    res.send({
        error: {
            status: err.status,
            message: err.message
        }
    });
});

module.exports = app;