const joi = require('joi')

const name = joi.string().required()
const alias = joi.string().alphanum().required()
const id = joi.number().integer().min(1).required()


exports.verify_artcates_add_data = {
    body: {
        name,
        alias
    }
}
exports.verify_artcates_Id = {
    params: {
        id
    }
}
exports.verify_update_data = {
    body: {
        id,
        name,
        alias
    }
}