var mysql = require('mysql');

var bd_config = {
    connectionLimit: 10,
    host: 'localhost',
    port: 3308,
    user: 'root',
    password: 'mysql',
    database: 'storeapp'
};

var pool = mysql.createPool(bd_config);

pool.getConnection(function (err, connection) {
    // connected! (unless `err` is set)
    //if (err) throw err;
    if (err) console.log("error: " + err);
    // 'ER_BAD_DB_ERROR'
});

pool.on('error', function (err) {
    if (err) console.log("error code: " +err.code);
    // 'ER_BAD_DB_ERROR'
    // https://www.npmjs.com/package/mysql#error-handling
});

module.exports = pool;
