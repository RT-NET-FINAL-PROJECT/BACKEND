const express = require("express");
const router = express.Router();
const usersRouter = require("./warga");
const eventRouter = require("./event");
const rtRouter = require("./rt");
const adminRouter = require("./admin");
const service = require("./service");

router.use(usersRouter);
router.use(eventRouter);
router.use(rtRouter);
router.use(adminRouter);
router.use(service);

module.exports = router;
