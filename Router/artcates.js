const express = require('express')
const expressJoi = require('@escook/express-joi')
const {
    verify_artcates_add_data,
    verify_artcates_Id,
    verify_update_data
} = require('../custom/verify_artcate')
const {
    artcates_list,
    artcates_add,
    deletecatebyId,
    getArtcatebyId,
    updateCateById
} = require('../Router_Handler/artcates')
const router = express.Router()


router.get('/cates', artcates_list)

router.post('/addcates', expressJoi(verify_artcates_add_data), artcates_add)

router.get('/deletecate/:id', expressJoi(verify_artcates_Id), deletecatebyId)

router.get('/cate/:id', expressJoi(verify_artcates_Id), getArtcatebyId)

router.post('/updateCateById', expressJoi(verify_update_data), updateCateById)

module.exports = router