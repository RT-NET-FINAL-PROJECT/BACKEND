const express = require("express");
const router = express.Router();
const usersRouter = require('./warga')
const eventRouter = require('./event')
const paymentRouter = require('./payment')
const rtRouter = require("./rt")

router.use(usersRouter)
router.use(eventRouter)
router.use(paymentRouter)
router.use(rtRouter)

module.exports = router