const router = require('express').Router();

// this is just to test we have nested everything correctly
router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});

module.exports = router;