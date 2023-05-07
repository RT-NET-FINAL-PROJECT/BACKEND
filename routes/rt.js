const router = require('express').Router()
const ControllerRt = require('../controllers/controllerRt')
const { authentication } = require('../middlewares/authentication')
const { authorizationRt } = require('../middlewares/authorization')



router.post('/rt/register', ControllerRt.registerRt)
router.post('/sekertariat/register',authentication, authorizationRt,ControllerRt.registerSekertariat)

router.get('/users',authentication,authorizationRt, ControllerRt.findAllWarga) //yang bisa get all data warga hanya RT dan Sekertariat
router.post('/users',authentication,authorizationRt, ControllerRt.createWarga) //add warga sebatas main entity aja
router.delete('/users/:id',authentication,authorizationRt, ControllerRt.deleteWarga) //delete data warga by id
module.exports = router