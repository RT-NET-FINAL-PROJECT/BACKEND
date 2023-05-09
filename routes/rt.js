const router = require('express').Router()
const ControllerRt = require('../controllers/controllerRt')
const { login } = require('../controllers/controllerUser')
const { authentication } = require('../middlewares/authentication')
const { authorizationRt} = require('../middlewares/authorization')

router.post('/rt/login', ControllerRt.loginRt)
router.post('/rt/register', ControllerRt.registerRt) 
router.post('/sekretariat/register', authentication, authorizationRt, ControllerRt.registerSekretariat)

router.get('/rt/users/submissions',authentication,authorizationRt, ControllerRt.findAllSubmissions) // find all semua persetujuan RT
router.patch('/rt/users/:id',authentication,authorizationRt, ControllerRt.approveUser) //persetujuan rt agar bisa login

router.get('/rt/users', authentication, authorizationRt, ControllerRt.findAllWarga) //yang bisa get all data warga hanya RT dan Sekertariat
router.post('/rt/users', authentication, authorizationRt, ControllerRt.createWarga) //add warga sebatas main entity aja
router.put('/rt/users/:id', authentication, authorizationRt, ControllerRt.updateWarga) //add warga sebatas main entity aja
router.delete('/rt/users/:id', authentication, authorizationRt, ControllerRt.deleteWarga) //delete data warga by id

module.exports = router;