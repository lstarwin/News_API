const joi = require('joi')
const res_cc = (req, res, next) => {
    res.cc = (err, status = 1) => {
        err = err instanceof Error ? err.message : err
        return res.send({
            status,
            err
        })
    }
    next()

}
const res_pp = (req, res, next) => {
    res.pp = (message, status = 0, data) => {
        res.send({
            status,
            message,
            data
        })
    }
    next()
}

const err_mw = (err, req, res, next) => {
    if (err instanceof joi.ValidationError) return res.cc(err)
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败: ' + err.message)
    res.cc(err)
}

module.exports = {
    res_cc: res_cc,
    err_mw: err_mw,
    res_pp: res_pp

}