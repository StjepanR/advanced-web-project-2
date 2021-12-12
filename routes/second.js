var express = require('express');
var router = express.Router();
var DOMParser = require('xmldom').DOMParser;
var libxmljs = require('libxmljs');
var xmldoc = require('xmldoc');

/* GET second endpoint. */
router.get('/', function(req, res, next) {
    res.render('pages/second', { title: 'Vanjski XML entiteti (XML External Entity, XXE)' });
});

/* POST on second safe endpoint. */
router.post('/safe', function(req, res, next) {

    if (!req.files) {
        res.status(500)
        res.render('pages/error', {message: 'No file', error: { status: 500, stack: 'stack'}, title: 'Error'});
        return;
    }

    try {

        var xml = String(req.files.file.data);
        console.log(xml);

        var xmlStringSerialized = libxmljs.parseXml(xml, { noent: true });
        var response = new xmldoc.XmlDocument(xmlStringSerialized).toString({trimmed:true})

        res.render('pages/second', {result: response, title: 'safe'});

    } catch (err) {
        res.send(err.toString());
        res.status(500);
        res.render('pages/error', { title: 'Error' });
    }
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

        var xml = String(req.files.file.data);
        console.log(xml);

        var xmlStringSerialized = libxmljs.parseXml(xml, { noent: true });
        var response = new xmldoc.XmlDocument(xmlStringSerialized).toString({trimmed:true})

        res.render('pages/second', {result: response, title: 'unsafe'});

    } catch (err) {
        res.send(err.toString());
        res.status(500);
        res.render('pages/error', { title: 'Error' });
    }
});

module.exports = router;