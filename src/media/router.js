const express = require('express')
const router = express.Router();
const controller = require('./controller')
const { authJwt } = require("../../auth/middleware");

//parametre alanları öncesinde ekle
// parametre ile karışma ihtimali olanlar varsa onları daha ekle
// requestlerde mümkün olduğunca next kullanma emin olmadıkça
router.get('/check', controller.check)
router.get('/sql/all/', [authJwt.verifyToken, authJwt.isAdmin], controller.getAllBySql)
router.get('/sql/:media_id', controller.getByIdBySql)
router.put('/delete/:company_id', [authJwt.verifyToken, authJwt.isModeratorOrAdmin], controller.delete)
router.put('/changeactive/:company_id', [authJwt.verifyToken, authJwt.isModeratorOrAdmin], controller.changeActiveStatus)
router.get('/:media_id', controller.getByID)
router.put('/:media_id', controller.update)
router.get('/', [authJwt.verifyToken, authJwt.isAdmin], controller.getAll)
router.post('/', controller.create)

module.exports = router
