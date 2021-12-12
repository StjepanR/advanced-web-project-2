var express = require('express');
var bcrypt = require("bcrypt");
var db = require("../db/index");
var router = express.Router();
var fs = require('fs');
var serialize = require('node-serialize');

/* GET third endpoint. */
router.get('/', function(req, res, next) {
    res.render('pages/third', { title: 'Nesigurna deserijalizacija (Insecure Deserialization)\n' });
});

/* POST on third safe endpoint. */
router.post('/safe', async function(req, res, next) {
    console.log(req.body)

    safe_search_sql = `select email, password, role from users where email like ?;`
    safe_insert_sql = `insert into users (email, password, role) values (?, ?, ?)`;

    var salt = await bcrypt.genSalt(10);
    var password = await bcrypt.hash(req.body.password, salt);

    role = 'user'

    db.run(safe_insert_sql, [req.body.email, password, role], (err) => {
        if (err) {
            throw err;
        } else {
            console.log('A row has been successfully inserted.');
        }
    });

    db.all(safe_search_sql, req.body.email, (err, rows) => {
        if (err) {
            throw err;
        } else {
            rows.forEach((row) => {
                console.log(row);
            });
            res.render('pages/third', {users: rows, title: 'safe'})
        }
    })
});

/* POST on third unsafe endpoint. */
router.post('/unsafe', async function(req, res, next) {
    console.log(req.body)

    safe_search_sql = `select email, password, role from users where email like ?;`
    safe_insert_sql = `insert into users (email, password, role) values (?, ?, ?)`;

    var salt = await bcrypt.genSalt(10);
    var password = await bcrypt.hash(req.body.password, salt);

    role = 'user';

    //nesigurna deserilizacija
    var unserialized = JSON.stringify(req.body);
    var obj = serialize.unserialize(unserialized);

    db.run(safe_insert_sql, [req.body.email, password, role], (err) => {
        if (err) {
            throw err;
        } else {
            console.log('A row has been successfully inserted.');
        }
    });

    db.all(safe_search_sql, req.body.email, (err, rows) => {
        if (err) {
            throw err;
        } else {
            rows.forEach((row) => {
                console.log(row);
            });
            res.render('pages/third', {users: rows, title: 'unsafe'})
        }
    })
});

module.exports = router;