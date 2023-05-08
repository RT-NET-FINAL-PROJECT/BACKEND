const express = require("express");
const router = express.Router();
const usersRouter = require('./warga')
const eventRouter = require('./event')
const paymentRouter = require('./payment')
<<<<<<< HEAD
const rtRouter = require("./rt");
=======
const rtRouter = require("./rt")
const adminRouter = require("./admin")
>>>>>>> 84c152da36e527ff6b7872071c818154823e02ad
const service = require("./service");

router.use(usersRouter)
router.use(eventRouter)
router.use(paymentRouter)
router.use(rtRouter)
<<<<<<< HEAD
router.use(service);

=======
router.use(adminRouter)
router.use(service)
>>>>>>> 84c152da36e527ff6b7872071c818154823e02ad
module.exports = router