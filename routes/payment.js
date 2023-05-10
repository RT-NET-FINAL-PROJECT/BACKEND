const router = require("express").Router();
const ControllerPayment = require("../controllers/controllerPayment");

router.get("/payment", ControllerPayment.findAllPayment);
router.post("/payment", ControllerPayment.createPayment);

module.exports = router;
