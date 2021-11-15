var express = require('express');
var router = express.Router();

/* GET first safe endpoint. */
router.get('/first/safe', function(req, res, next) {
    res.render('first', { title: 'Express' });
});

/* GET second unsafe endpoint. */
router.get('/first/unsafe', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;