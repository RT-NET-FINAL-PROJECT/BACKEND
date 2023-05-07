const router = require('express').Router()
const ControllerUser = require('../controllers/controllerUser')
const { authentication } = require('../middlewares/authentication')
const { authorizationRt } = require('../middlewares/authorization')



router.get('/', (req, res) => {
    res.status(200)
        .json({ massage: "TES MASUK USER" })
})
//User dapat registrasi sebagai Admin, Pengurus RT ataupun Warga

//USER ADMIN

//USER RT

//USER WARGA
router.post('/login', ControllerUser.login)
router.post('/users/register', ControllerUser.register) // setelah register akun sudah tercreate cuman status masih pending
router.patch('/users/:id',authentication,authorizationRt, ControllerUser.approveUser) //persetujuan rt agar bisa login



router.put('/users',authentication, ControllerUser.updateUser)//warga cuman bisa update data dia sendiri
router.get('/users/:id',authentication, ControllerUser.detailUser)//buat profile




module.exports = router