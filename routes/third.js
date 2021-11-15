var express = require('express');
var router = express.Router();

/* GET third safe endpoint. */
router.get('/third/safe', function(req, res, next) {
    res.render('third', { title: 'Express' });
});

/* GET third unsafe endpoint. */
router.get('/third/unsafe', function(req, res, next) {
    res.render('third', { title: 'Express' });
});

module.exports = router;