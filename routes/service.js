const { getAllServices, createService, getServiceDetail, editService, deleteService } = require("../controllers/controllerService");
const { updateRequestService, getAllSubmission, getSubmissionDetail, editSubmission, requestService, deleteSubmission } = require("../controllers/controllerSubmission");
const upload = require("../helpers/multer");
const { authentication } = require("../middlewares/authentication");
const service = require("express").Router();

service.get("/services", authentication, getAllServices);
service.get("/submissions", authentication, getAllSubmission);
service.post("/submissions/:serviceId", authentication, upload.single("lampiran"), requestService);
service.get("/submissions/:submissionId", authentication, getSubmissionDetail);
service.put("/submissions/:submissionId", authentication, editSubmission);
service.delete("/submissions/:submissionId", authentication, deleteSubmission);
service.post("/services", authentication, createService);
service.get("/services/:serviceId", authentication, getServiceDetail);
service.put("/services/:serviceId", authentication, editService);
service.delete("/services/:serviceId", authentication, deleteService);
service.patch("/services/:serviceId/submissions/:submissionId", authentication, updateRequestService);

module.exports = service;
