const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});
const sqlQuery = (sql, args) => new Promise((resolve, reject) => {
  db.query(sql, args, (err, data) => {
    if (err) { reject(err); console.error(err.sqlMessage); }
    resolve(data);
  });
});

module.exports = sqlQuery;
