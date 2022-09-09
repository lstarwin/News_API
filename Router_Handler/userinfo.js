const db = require('../db/index')
const bcryptjs = require('bcryptjs')



exports.get = (req, res) => {
    let sql = `SELECT ID,USERNAME,NICKNAME,EMAIL,USER_PIC FROM EV_USERS WHERE ID=?`
    db.query(sql, req.user.id, (err, result) => {
        if (err) return res.cc(err)
        if (result.length !== 1) return res.cc('获取用户信息失败!!!')

        res.send({
            status: 0,
            message: '获取用户信息成功',
            data: result[0]
        })

    })
}
exports.update = (req, res) => {
    let sql = `UPDATE EV_USERS SET ? WHERE ID=?`
    db.query(sql, [req.body, req.body.id], (err, result) => {
        if (err) return res.css(err)
        if (result.affectedRows !== 1) return res.cc('更新用户信息失败')
        res.pp('更新用户信息成功')
    })
}

exports.updatepwd = (req, res) => {
    //根据id查询是否有该用户
    let sql = `SELECT * FROM EV_USERS WHERE ID=?`
    db.query(sql, req.user.id, (err, result) => {
        if (err) return res.cc(err)
        if (result.length !== 1) return res.cc('用户查询失败!!')
            //验证传入旧密码
        const compareResult = bcryptjs.compareSync(req.body.oldPwd, result[0].password)
        if (!compareResult) return res.cc('旧密码验证失败')
            //修改密码
        const newPwd = bcryptjs.hashSync(req.body.newPwd, 10)
        sql = `UPDATE EV_USERS SET PASSWORD=? WHERE ID=?`
        db.query(sql, [newPwd, result[0].id], (err, result) => {
            if (err) return res.cc(err)
            if (result.affectedRows !== 1) return res.cc('密码修改失败!')
            res.pp('密码修改成功!!')
        })
    })
}
exports.updateAvatar = (req, res) => {
    let sql = `UPDATE EV_USERS SET USER_PIC=? WHERE ID=?`
    db.query(sql, [req.body.avatar, req.user.id], (err, result) => {
        if (err) return res.cc(err)
        if (result.affectedRows !== 1) return res.cc('头像修改失败!!!')
        res.pp('头像修改成功!!!')
    })
}