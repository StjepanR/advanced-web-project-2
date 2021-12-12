var express = require('express');
var router = express.Router();
var xml2js = require('xml2js');
var fs = require('fs');

/* GET second endpoint. */
router.get('/', function(req, res, next) {
    res.render('pages/second', { title: 'Vanjski XML entiteti (XML External Entity, XXE)' });
});

/* POST on second safe endpoint. */
router.post('/safe', function(req, res, next) {
    res.render('pages/second', { title: 'Vanjski XML entiteti (XML External Entity, XXE)' });
});

/* POST on second unsafe endpoint. */
router.post('/unsafe', function(req, res, next) {

    console.log(req.files)

    if (!req.files) {
        res.status(500)
        res.render('pages/error', {message: 'No file', error: { status: 500, stack: 'stack'}, title: 'Error'});
        return;
    }

    try {
        var parser = new xml2js.Parser();
        const xml = fs.readFileSync(req.files);
        const doc = parser.parseString(xml.toString(), (err, res) => {
            if (err) {
                throw err;
            } else {
                res.send(doc.text());
            }
        });
    } catch (err) {
        res.send(err.toString());
        res.status(500);
        res.render('pages/error', { title: 'Error' });
    }
});

module.exports = router;