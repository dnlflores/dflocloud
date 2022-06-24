const express = require('express');
const router = express.Router();

// this is a test route to set the cookie!
router.get('/hello/world', function (req, res) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.send('Hello World!');
});

module.exports = router;