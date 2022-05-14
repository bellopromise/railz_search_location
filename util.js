const { request } = require("express");

//check if any of the object values are empty
const isParamEmpty = (parameters)=>{
    return Object.keys(parameters).every(function(parameter) {
        return parameters[parameter]
    });
}

//error thrower for null checks
const isNullOrEmpty = (err, obj)=>{
    if(!obj)
    {
        throw err
    }    
}

//api request helpers
const makeRequest = (url, params, method)=>{
    let options={method};
    return new Promise((resolve, reject)=>{
        if('GET'=== method)
        {
            params.key = process.env.API_KEY;
            url += '?' + ( new URLSearchParams(params)).toString();
        }
        else{
            options.body = JSON.stringify(params);
        }
        request(url, method, (err, res, body)=>{
            if(err)
                return reject(err);
            return resolve(JSON.parse(body));
        });
    });
}

module.exports = { isParamEmpty, isNullOrEmpty, makeRequest }
