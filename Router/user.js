//用户路由模块

const express = require('express')
const express_joi = require('@escook/express-joi')

const router = express.Router()

const user_handler = require('../Router_Handler/user')
const {
    reg_login_verify
} = require('../custom/verify_users')

router.post('/reguser', express_joi(reg_login_verify), user_handler.reguser)

router.post('/login', express_joi(reg_login_verify), user_handler.login)


module.exports = router