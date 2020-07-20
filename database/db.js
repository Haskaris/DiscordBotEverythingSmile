require('dotenv').config();
const mysql = require('mysql2/promise');

module.exports = mysql.createConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});
/*.then((connection) => {
    connection.execute('CREATE TABLE Guilds(guildId VARCHAR(255))')
})
.then(() => console.log('Good'))
.catch(err => console.log(err));*/