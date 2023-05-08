const express = require("express");
const router = express.Router();
const usersRouter = require('./warga')
const eventRouter = require('./event')
const paymentRouter = require('./payment')
const rtRouter = require("./rt");
const service = require("./service");

router.use(usersRouter)
router.use(eventRouter)
router.use(paymentRouter)
router.use(rtRouter)
router.use(service);

module.exports = router