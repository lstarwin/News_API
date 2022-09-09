//用户路由处理模块

const db = require('../db/index')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../custom/config')


//用户注册
exports.reguser = (req, res) => {
        let username = req.body.username
        let password = req.body.password
            //用户名/密码验证不为空
            // if (username && password) {

        // } else {
        //     res.send({
        //         status: 1,
        //         message: '用户名或密码无效!!!'
        //     })
        // }
        //用户名查重
        let sql = 'SELECT * FROM EV_USERS WHERE USERNAME=?'
        db.query(sql, username, (err, result) => {
            if (err) return res.send({
                status: 1,
                message: err.message
            })


            if (result.length > 0) {
                return res.send({
                    status: 1,
                    message: '用户已被占用'
                })
            }
            //加密用户密码
            password = bcryptjs.hashSync(password, 10)
                //添加用户数据
            let sql = 'INSERT INTO EV_USERS SET ?'
            let insertData = {
                username: username,
                password: password
            }
            db.query(sql, insertData, (err, result) => {
                if (err) return res.send({
                    status: 1,
                    message: err.message
                })
                if (result.affectedRows !== 1) return res.send({
                    status: 1,
                    message: '添加用户信息失败!'
                })
                res.send({
                    status: 0,
                    message: '添加用户信息成功!!!'
                })
            })
        })
    }
    //用户登陆
exports.login = (req, res) => {
    const userinfo = req.body
    let sql = 'SELECT * FROM EV_USERS WHERE USERNAME=?'
    db.query(sql, userinfo.username, (err, result) => {
        if (err) return res.cc(err)
        if (result.length !== 1) return res.cc('登陆失败len=' + result.length)
        let compareResult = bcryptjs.compareSync(userinfo.password, result[0].password)
        if (!compareResult) return res.cc('登陆失败!')
        let tokenInfo = {
            ...result[0],
            password: '',
            user_pic: ''
        }
        tokenInfo = jwt.sign(tokenInfo, config.jwt_secret_key, {
            expiresIn: config.jwt_expireIn
        })
        res.send({
            status: 0,
            message: '登陆成功',
            token: 'Bearer ' + tokenInfo
        })
    })
}