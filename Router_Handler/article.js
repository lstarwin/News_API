const db = require('../db/index')
exports.article_add = (req, res) => {
    if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面必需上传!!')
    const articleInfo = {
        ...req.body,
        cover_img: 'upload/' + req.file.filename,
        pub_date: new Date(),
        author_id: req.user.id
    }

    const sql = 'INSERT INTO ev_articles SET ?'
    db.query(sql, articleInfo, (err, result) => {
        if (err) return res.cc(err)
        if (result.affectedRows !== 1) return res.cc('发布文章失败....')
        res.pp('发布文章成功!!')
    })

}