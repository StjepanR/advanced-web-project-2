var express = require('express');
var router = express.Router();

/* GET second safe endpoint. */
router.get('/safe', function(req, res, next) {
    res.render('second', { title: 'Vanjski XML entiteti (XML External Entity, XXE)' });
});

/* GET second unsafe endpoint. */
router.get('/unsafe', function(req, res, next) {
    res.render('second', { title: 'Vanjski XML entiteti (XML External Entity, XXE)' });
});


module.exports = router;