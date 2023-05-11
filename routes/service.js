const { getAllServices, createService, getServiceDetail, editService, deleteService } = require("../controllers/controllerService");
const { updateRequestService, getAllSubmission, getSubmissionDetail, editSubmission, requestService, deleteSubmission, getUserSubmission, getServiceSubmission, getRegister, getRegisterSubmission, getAllSubmissionService } = require("../controllers/controllerSubmission");
const upload = require("../helpers/multer");
const { authentication } = require("../middlewares/authentication");
const service = require("express").Router();

service.get("/services", authentication, getAllServices);
service.post("/services", authentication, createService);
service.get("/submission/services", authentication, getAllSubmissionService); //done
service.get("/submission/registerwarga", authentication, getRegisterSubmission); //done
service.get("/submissions/mysubmission", authentication, getUserSubmission); //done
service.get("/submissions", authentication, getAllSubmission); //done
service.get("/services/:serviceId", authentication, getServiceDetail);
service.put("/services/:serviceId", authentication, editService);
service.delete("/services/:serviceId", authentication, deleteService);
service.post("/submissions/:serviceId", authentication, upload.single("lampiran"), requestService); //done
service.get("/submissions/:submissionId", authentication, getSubmissionDetail); //done
service.put("/submissions/:submissionId", authentication, editSubmission); // done
service.delete("/submissions/:submissionId", authentication, deleteSubmission); //done
service.patch("/services/:serviceId/submissions/:submissionId", authentication, updateRequestService); // 3 kasus done


module.exports = service;