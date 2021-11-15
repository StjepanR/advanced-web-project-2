var express = require('express');
var router = express.Router();

/* GET second safe endpoint. */
router.get('/second/safe', function(req, res, next) {
    res.render('second', { title: 'Express' });
});

/* GET second unsafe endpoint. */
router.get('/second/unsafe', function(req, res, next) {
    res.render('second', { title: 'Express' });
});


module.exports = router;