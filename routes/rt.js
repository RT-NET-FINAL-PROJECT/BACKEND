const router = require('express').Router()
const ControllerRt = require('../controllers/controllerRt')


router.get('/rt', ControllerRt.findAllRt)
router.post('/rt', ControllerRt.createRt)

module.exports = router