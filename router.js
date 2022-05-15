const { getLocationDetails } = require('./locationController');

const router = require('express').Router();

router.get('/search-location', async(req, res, next)=>{
    try {
        const result = await getLocationDetails(req.query);
        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
    
});

module.exports = router;