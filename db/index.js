//数据管理模块

const mysql = require('mysql')

const dataSource = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'webdb'
})



module.exports = dataSource