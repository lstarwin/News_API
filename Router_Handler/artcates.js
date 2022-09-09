const db = require('../db/index')


exports.artcates_list = (req, res) => {
    let sql = `SELECT * FROM EV_ARTICLE_CATE WHERE NOT IS_DELETE ORDER BY ID ASC`
    db.query(sql, (err, result) => {
        if (err) return res.cc(err)
        res.pp('获取文章分类成功!', 0, result)
    })
}

exports.artcates_add = (req, res) => {
    let sql = `SELECT name,alias FROM EV_ARTICLE_CATE WHERE NAME=? OR UPPER(ALIAS=?)`
    db.query(sql, [req.body.name, req.body.alias], (err, result) => {
        if (err) return res.cc(err)
        if (result.length === 2) return res.cc('name与alias同时被占用')
        if (result.length === 1 && result[0].name === req.body.name && result[0].alias.toLowerCase() === req.body.alias.toLowerCase()) return res.cc('name与alias同时被占用')
        if (result.length === 1 && result[0].name === req.body.name) return res.cc('name被占用')
        if (result.length === 1 && result[0].alias.toLowerCase() === req.body.alias.toLowerCase()) return res.cc('alias被占用')
        sql = `INSERT INTO EV_ARTICLE_CATE SET ?`
        db.query(sql, req.body, (err, result) => {
            if (err) return res.cc(err)
            if (result.affectedRows !== 1) return res.cc('文章类型添加失败!!!')
            res.pp('文章类型添加成功!!!')
        })
    })
}
exports.deletecatebyId = (req, res) => {
    const sql = `UPDATE EV_ARTICLE_CATE SET IS_DELETE=1 WHERE ID=?`
    db.query(sql, req.params.id, (err, result) => {
        if (err) return res.cc(err)
        if (result.affectedRows !== 1) return res.cc('文章分类信息删除失败!')
        res.pp('文章分类信息删除成功!!')
    })
}
exports.getArtcatebyId = (req, res) => {
    const sql = `SELECT * FROM EV_ARTICLE_CATE WHERE ID=?`
    db.query(sql, req.params.id, (err, result) => {
        if (err) return res.cc(err)
        if (result.length > 1) return res.cc('文章类型查询失败!!!')
        res.pp('文章类型查询成功!', 0, result[0])
    })
}
exports.updateCateById = (req, res) => {
    const sql = `SELECT * FROM EV_ARTICLE_CATE WHERE ID<>? AND UPPER(NAME=? OR ALIAS=?)`
    db.query(sql, [req.body.id, req.body.name, req.body.alias], (err, result) => {
        if (err) return res.cc(err)
        if (result.length === 2) return res.cc('名称与别名已占用,请重新设定')
        if (result.length === 1 && result[0].name.toUpperCase() === req.body.name.toUpperCase()) return res.cc('名称已占用,请重新设定')
        if (result.length === 1 && result[0].alias.toUpperCase() === req.body.alias.toUpperCase()) return res.cc('别名已占用,请重新设定')
        const sql = `UPDATE EV_ARTICLE_CATE SET ? WHERE ID=?`
        db.query(sql, [req.body, req.body.id], (err, result) => {
            if (err) return res.cc(err)
            if (result.affectedRows !== 1) return res.cc('文章分类更新失败')
            res.pp('文章分类更新成功!!')
        })
    })
}