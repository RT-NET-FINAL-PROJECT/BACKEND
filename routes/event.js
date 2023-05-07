const router = require('express').Router()
const ControllerEvent = require('../controllers/controllerEvent')

router.get('/event', ControllerEvent.findAllEvent)
router.post('/event', ControllerEvent.createEvent)
router.put('/event', ControllerEvent.updateEvent)
router.get('/event/:id', ControllerEvent.detailEvent)
router.delete('/event/:id', ControllerEvent.deleteEvent)

module.exports = router