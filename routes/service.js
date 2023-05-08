const { getAllServices, createService, getServiceDetail, editService, updateService } = require('../controllers/controllerService');
const service = require('express').Router();

service.get('/services', getAllServices);
service.post('/services', createService);
service.get('/services/:serviceId', getServiceDetail);
service.put('/services/:serviceId', editService);
service.patch('/services/:serviceId', updateService);

module.exports = service;