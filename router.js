const router = require('express').Router();
const { getLocationDetails } = require('./locationController');

router.get('/search-location', async (req, res, next) => {
  try {
    const result = await getLocationDetails(req.query);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
