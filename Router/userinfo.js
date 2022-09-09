const express = require('express')
const getUserInfo = require('../Router_Handler/userinfo')
const router = express.Router()
const expressJoi = require('@escook/express-joi')
const {
    update_userinfo_verify,
    updatepwd_pws_verify,
    updateAvatar_avatardata_verify
} = require('../custom/verify_users')

router.get('/userinfo', getUserInfo.get)


router.post('/userinfo', expressJoi(update_userinfo_verify), getUserInfo.update)


router.post('/updatepwd', expressJoi(updatepwd_pws_verify), getUserInfo.updatepwd)


router.post('/update/updateAvatar', expressJoi(updateAvatar_avatardata_verify), getUserInfo.updateAvatar)

module.exports = router