const router = require('express').Router()
const ControllerUser = require('../controllers/controllerUser')
const upload = require('../helpers/multer')
const { authentication } = require('../middlewares/authentication')
const { authorizationRt, authorizationKendaraan, authorizationTamu, authorizationComment } = require('../middlewares/authorization')

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


//KENDARAAN
router.post('/users/vehicle',authentication, ControllerUser.addKendaraan)
router.put('/users/vehicle/:id',authentication,authorizationKendaraan, ControllerUser.updateKendaraan)
router.delete('/users/vehicle/:id',authentication,authorizationKendaraan, ControllerUser.deleteKendaraan)

//TAMU
router.post('/users/guest',authentication, ControllerUser.addTamu)
router.delete('/users/guest/:id',authentication,authorizationTamu, ControllerUser.deleteTamu)

//USER COMMENT
router.post('/users/comment',authentication, ControllerUser.addComment)
router.delete('/users/comment/:id',authentication,authorizationComment, ControllerUser.deleteComment)

router.put('/users/:id',authentication,upload.single("ktpImg"), ControllerUser.updateUser)//warga cuman bisa update data dia sendiri
router.patch('/users/addktp',authentication,upload.single("ktpImg"), ControllerUser.addKtp)//warga cuman bisa update data dia sendiri
router.patch('/users/addkk',authentication,upload.single("kkImg"), ControllerUser.addKartuKeluarga)//warga cuman bisa update data dia sendiri
router.patch('/users/addphoto',authentication,upload.single("photoUrl"), ControllerUser.addPhoto)//warga cuman bisa update data dia sendiri
router.patch('/users/addakta',authentication,upload.single("aktaImg"), ControllerUser.addAkta)//warga cuman bisa update data dia sendiri
router.get('/users/:id',authentication, ControllerUser.detailUser)//buat profile

module.exports = router