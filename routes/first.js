var express = require('express');
var router = express.Router();
var db = require("../db/index");
var bcrypt = require("bcrypt");
const {check} = require('express-validator');

/* GET second endpoint. */
router.get('/', function(req, res, next) {
    res.render('pages/first', { title: 'Nesigurna pohrana osjetljivih podataka (Sensitive Data Exposure)\n' });
});

/* POST on first safe endpoint. */
router.post('/safe',
    check('email').not().isEmpty().withMessage('Latitude is requierd'),
    check('password').not().isEmpty().withMessage('Longitude is required'),
    async function (req, res, next) {
    console.log(req.body);
    safe_search_sql = `select email, password from users where email like ?;`
    safe_insert_sql = `insert into users (email, password, role) values (?, ?, ?)`;

    var salt = await bcrypt.genSalt(10);
    var password = await bcrypt.hash(req.body.password, salt);

    db.run(safe_insert_sql, [req.body.email, password, 'user'], (err) => {
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
            res.render('pages/first', {users: rows, title: 'safe'})
        }
    })
});

/* POST on second unsafe endpoint. */
router.post('/unsafe',  function(req, res, next) {
    console.log(req.body);
    unsafe_search_sql = `select email, password from users where email like '` + req.body.email + `';`;
    unsafe_insert_sql = `insert into users (email, password, role) values (?, ?, ?);`;

    db.run(unsafe_insert_sql, [req.body.email, req.body.password, 'user'], (err) => {
        if (err) {
            throw err;
        } else {
            console.log('A row has been successfully inserted.');
        }
    });

    db.all(unsafe_search_sql, (err, rows) => {
        if (err) {
            throw err;
        } else {
            rows.forEach((row) => {
                console.log(row);
            });
            res.render('pages/first', {users : rows, title: 'unsafe'})
        }
    })
});


module.exports = router;