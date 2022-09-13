const joi = require('joi')


const title = joi.string().required()
const cate_id = joi.number().integer().min(1).required()
const content = joi.string().required().allow('')
const state = joi.string().required().valid('草稿', '已发布')


exports.verify_article_fields_data = {
    body: {
        title,
        cate_id,
        content,
        state
    }
}