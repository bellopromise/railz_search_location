const createError = require("http-errors");
const { isParamEmpty, makeRequest, nullCheck } = require("./util")

module.exports.getLocationDetails = async (query) =>{
    //validate input
    if(!isParamEmpty(query))
    {
        throw createError.BadRequest("Incomplete request data. Please ensure all the fields are populated.");
    }
    const address = Object.values(query).join(",");

    const geocodeResp = await makeRequest('https://maps.googleapis.com/maps/api/geocode/json', { address }, 'GET');

    nullCheck(
        createError.InternalServerError("An error occured while communicating with geocoding API, please review your request credentials and try again later."),
        geocodeResp.results?.[0]?.geometry?.location
    );
    const { lat, lng } = geocodeResp.results[0].geometry.location;

    //ensuring concurrency between timezone and elevation requests
    const responseCollection = await Promise.all([
        makeRequest('https://maps.googleapis.com/maps/api/elevation/json',{ locations: [lat, lng].join(",")}, 'GET'),
        makeRequest('https://maps.googleapis.com/maps/api/timezone/json',{ location: [lat, lng].join(","), timestamp: Date.now()/1000}, 'GET')    
    ]);

    const [elevationResp, timezoneResp] = responseCollection;

    nullCheck(
        createError
          .InternalServerError("An error occured while communicating with elevation API, please review your request credentials and try again later."),
          elevationResp.results?.[0]?.elevation       
    );

    const { elevation } = elevationResp.results[0];

    nullCheck(
        createError
          .InternalServerError("An error occured while communicating with timezone API, please review your request credentials and try again later."),
        (timezoneResp.rawOffset || timezoneResp.timeZoneId)
    );

    const {  rawOffset,  dstOffset,  timeZoneId } = timezoneResp;
  
    const timezoneOffset = (rawOffset + dstOffset) / 3600;

    return { longtitude: lng, latitude: lat, elevation, timezone: timezoneOffset, timeZoneId };
}