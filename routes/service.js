const {
  getAllServices,
  createService,
  getServiceDetail,
  editService,
  updateService,
} = require("../controllers/controllerService");
const { authentication } = require("../middlewares/authentication");
const service = require("express").Router();

service.get("/services", authentication, getAllServices);
service.post("/services", authentication, createService);
service.get("/services/:serviceId", authentication, getServiceDetail);
service.put("/services/:serviceId", authentication, editService);
service.patch("/services/:serviceId", authentication, updateService);

module.exports = service;
