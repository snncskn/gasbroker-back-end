const express = require('express')
const router = express.Router();
const controller = require('./controller')

//parametre alanları öncesinde ekle
// parametre ile karışma ihtimali olanlar varsa onları daha ekle
// requestlerde mümkün olduğunca next kullanma emin olmadıkça
router.get('/check', controller.check)
router.get('/sql/all/', controller.getAllBySql)
router.get('/sql/:parameter_id', controller.getByIdBySql)
router.put('/delete/:parameter_id', controller.delete)
router.put('/changeactive/:parameter_id', controller.changeActiveStatus)
router.get('/:parameter_id', controller.getByID)
router.put('/:parameter_id', controller.update)
router.get('/', controller.getAll)
router.post('/', controller.create)

module.exports = router
