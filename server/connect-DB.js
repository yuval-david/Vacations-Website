const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "vacationdb"
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("connected to SQL :)");
});

module.exports = db;