const sqlite3 = require('sqlite3').verbose();

// open database in memory
let db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        return console.error(err.message);
    } else {
        console.log('Connected to the in-memory SQlite database.');
    }
});

var create_user_table_sql = `create table users (email text not null, password text not null, role text not null);`;

var insert_user_table_sql = `insert into users (email, password, role) values ('example1@example.com', 'lozinka123', 'user'), ('example2@example.com', 'lozinka123', 'admin');`;

var select_user_table_sql = `select * from users`;

db.serialize(() => {
    db.run(create_user_table_sql)
        .run(insert_user_table_sql)
        .each(select_user_table_sql, (err, row) => {
            if (err) {
                throw err;
            } else {
                console.log(row);
            }
        })
});

module.exports = db