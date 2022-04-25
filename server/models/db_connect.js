require('dotenv').config()
const mysql = require('mysql2')

const con = mysql.createConnection( {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
})

con.connect(function(err) {
    if (err) throw err
    console.log("Connected")
    con.query("CREATE DATABASE IF NOT EXISTS web_db", function (err, result) {
        if (err) throw err
        console.log("Database created")
    })
})

module.exports = con