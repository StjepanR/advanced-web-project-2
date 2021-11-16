var express = require('express');
var router = express.Router();

/* GET first safe endpoint. */
router.get('/safe', function(req, res, next) {
    res.render('first', { title: 'Nesigurna pohrana osjetljivih podataka (Sensitive Data Exposure)\n' });
});

/* GET second unsafe endpoint. */
router.get('/unsafe', function(req, res, next) {
    res.render('pages/index', { title: 'Nesigurna pohrana osjetljivih podataka (Sensitive Data Exposure)\n' });
});

module.exports = router;