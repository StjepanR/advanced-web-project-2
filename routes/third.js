var express = require('express');
var router = express.Router();

/* GET third safe endpoint. */
router.get('/safe', function(req, res, next) {
    res.render('third', { title: 'Nesigurna deserijalizacija (Insecure Deserialization)\n' });
});

/* GET third unsafe endpoint. */
router.get('/unsafe', function(req, res, next) {
    res.render('third', { title: 'Nesigurna deserijalizacija (Insecure Deserialization)\n' });
});

module.exports = router;