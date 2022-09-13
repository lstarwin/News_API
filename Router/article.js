const express = require('express')
const expressJoi = require('@escook/express-joi')
const router = express.Router()
const config = require('../custom/config')
const {
    article_add
} = require('../Router_Handler/article')

const multer = require('multer')({
    dest: config.upload_path
})
const {
    verify_article_fields_data
} = require('../custom/verify_article')

router.post('/add', multer.single('cover_img'), expressJoi(verify_article_fields_data), article_add)






module.exports = router