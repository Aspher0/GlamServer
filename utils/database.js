const fs = require("fs");
const ini = require("ini");

const mysql = require('mysql');

const config = ini.parse(fs.readFileSync(__dirname + '/config.ini', 'utf-8'))

const pool = mysql.createPool({
    user: config.database.username,
    password: config.database.password,
    host: config.database.servername,
    database: config.database.dbnamelaurent,
});

module.exports = pool;