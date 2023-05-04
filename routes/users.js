const router = require('express').Router()



router.get('/', (req, res) => {
    res.status(200)
        .json({ massage: "TES MASUK USER" })
})
//User dapat registrasi sebagai Admin, Pengurus RT ataupun Warga

//USER ADMIN

//USER RT

//USER WARGA



module.exports = router