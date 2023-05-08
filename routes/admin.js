const router = require('express').Router()
const ControllerAdmin = require('../controllers/controllerAdmin')
const { authentication } = require('../middlewares/authentication')
const { authorizationAdmin } = require('../middlewares/authorization')

//HANYA ADMIN YG BISA DAFTARIN RT BARU
router.post('/admin/register', authentication, authorizationAdmin, ControllerAdmin.createDataRt)

module.exports = router