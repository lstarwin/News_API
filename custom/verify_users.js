const joi = require('joi')

const username = joi.string().min(2).max(10).alphanum().required()
const password = joi.string().pattern(/^[\S]{2,10}$/).required()

module.exports.reg_login_verify = {
    body: {
        username,
        password
    }
}

const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()

exports.update_userinfo_verify = {
    body: {
        id,
        nickname,
        email
    }
}
exports.updatepwd_pws_verify = {
    body: {
        oldPwd: password,
        newPwd: joi.not(joi.ref('oldPwd')).concat(password)
    }
}

exports.updateAvatar_avatardata_verify = {
    body: {
        avatar: joi.string().dataUri().required()
    }
}