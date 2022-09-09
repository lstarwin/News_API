const express = require('express')
const cors = require('cors')
const userRouter = require('./Router/user')
const artcatesRouter = require('./Router/artcates')
const userInfoRouter = require('./Router/userinfo')
const custome_mw = require('./custom/middleware')
const express_jwt = require('express-jwt')
const config = require('./custom/config')


const app = express()
    //注册跨哉中间件[CORS VERSION 2.8.5]
app.use(cors())
    //用于解析application/x-www-form-urlencoded
app.use(express.urlencoded({
        extended: false
    }))
    //简便方式设置返回错误/失败信息
app.use(custome_mw.res_cc)
    //简便方式设置返回成功信息
app.use(custome_mw.res_pp)
app.use(express_jwt({
        secret: config.jwt_secret_key
    }).unless({
        path: /^\/api/
    }))
    //用户模块路由
app.use('/api/', userRouter)

//用户信息模块路由
app.use('/my/', userInfoRouter)

//文章分类路由
app.use('/my/article', artcatesRouter)




//全局错误中间件
app.use(custome_mw.err_mw)




app.listen(8080, () => {
    console.log('****************************************************');
    console.log('<EXPRESS SERVER IS RUNNING AT HTTP://127.0.0.1:8080>');
    console.log('****************************************************');
})