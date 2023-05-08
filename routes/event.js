const router = require("express").Router();
const ControllerEvent = require("../controllers/controllerEvent");
const { authentication } = require("../middlewares/authentication");
const { authorizationRt } = require("../middlewares/authorization");

router.get("/event", authentication, ControllerEvent.findAllEvent);
router.get("/pengumuman", authentication, ControllerEvent.findAllAnnouncements);
router.post("/event", authentication,authorizationRt, ControllerEvent.createEvent);


router.put("/event/:id",authentication,authorizationRt, ControllerEvent.updateEvent);
router.get("/event/:id", authentication, ControllerEvent.detailEvent);
router.delete("/event/:id", authentication,authorizationRt, ControllerEvent.deleteEvent);

module.exports = router;