
var mysql = require('mysql');
// 链接池：创建多个链接、复用与分发链接
exports.pool = mysql.createPool({
    connectionLimit: 20,
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'movie'
})
