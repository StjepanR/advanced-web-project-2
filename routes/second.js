var express = require('express');
var router = express.Router();
var DOMParser = require('xmldom').DOMParser;
var libxmljs = require('libxmljs');
var xmldoc = require('xmldoc');
var DOMParser = require('xmldom').DOMParser;
var parser = new DOMParser();

/* GET second endpoint. */
router.get('/', function(req, res, next) {
    res.render('pages/second', { title: 'Vanjski XML entiteti (XML External Entity, XXE)' });
});

/* POST on second safe endpoint. */
router.post('/safe', function(req, res, next) {

    if (!req.files) {
        res.status(500)
        res.render('pages/error', {error: { status: 500, stack: '', message: 'No file'}, title: 'Error'});
    }

    try {

        var xml = String(req.files.file.data);
        console.log(xml);

        var xmlStringSerialized = libxmljs.parseXml(xml);
        var response = new xmldoc.XmlDocument(xmlStringSerialized).toString({trimmed:true})

        res.render('pages/second', {result: response, title: 'safe'});


    } catch (err) {
        try {
            var xmlStringSerialized = libxmljs.parseXml(xml);
            if (typeof xmlStringSerialized !== 'undefined') {
                var response = new xmldoc.XmlDocument(xmlStringSerialized).toString({trimmed:true})
                res.send(response);
            }
        } catch(err) {
            res.status(500);
            res.render('pages/error', { title: 'Error',  error: err});
        }
        // res.status(500);
        // res.render('pages/error', { title: 'Error',  error: err});
    }
});

/* POST on second unsafe endpoint. */
router.post('/unsafe', function(req, res, next) {

    console.log(req.files)

    if (!req.files) {
        res.status(500)
        res.render('pages/error', {error: { status: 500, stack: '', message: 'No file'}, title: 'Error'});
    }

    try {

        var xml = String(req.files.file.data);
        console.log(xml);

        var xmlStringSerialized = libxmljs.parseXml(xml, { noent: true });
        var response = new xmldoc.XmlDocument(xmlStringSerialized).toString({trimmed:true})

        res.render('pages/second', {result: response, title: 'unsafe'});

    } catch (err) {
        try {
            var xmlStringSerialized = parser.parseFromString(xml, 'text/xml')
            if (typeof xmlStringSerialized !== 'undefined') {
                var response = new xmldoc.XmlDocument(xmlStringSerialized).toString({trimmed:true})
                res.send(response);
            }
        } catch(err) {
            res.status(500);
            res.render('pages/error', { title: 'Error',  error: err});
        }
        // res.status(500);
        // res.render('pages/error', { title: 'Error',  error: err});
    }
});

module.exports = router;