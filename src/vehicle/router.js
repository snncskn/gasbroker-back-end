const express = require('express')
const router = express.Router();
const controller = require('./controller')

router.get('/check', controller.check)
router.get('/sql/all/', controller.getAllBySql)
router.get('/sql/:vehicle_id', controller.getByIdBySql)
router.put('/delete/:vehicle_id', controller.delete)
router.put('/changeactive/:vehicle_id', controller.changeActiveStatus)
router.get('/:vehicle_id', controller.getByID)
router.put('/:vehicle_id', controller.update)


router.get('/', controller.getAll)
router.post('/', controller.create)

module.exports = router
