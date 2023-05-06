const router = require('express').Router()
const ControllerUser = require('../controllers/controllerUser')



router.get('/', (req, res) => {
    res.status(200)
        .json({ massage: "TES MASUK USER" })
})
//User dapat registrasi sebagai Admin, Pengurus RT ataupun Warga

//USER ADMIN

//USER RT

//USER WARGA
router.post('/login', ControllerUser.login)
router.post('/users/register', ControllerUser.register)


router.get('/users', ControllerUser.findAllUser)
router.put('/users', ControllerUser.updateUser)
router.get('/users/:id', ControllerUser.detailUser)
router.delete('/users/:id', ControllerUser.deleteUser)




module.exports = router