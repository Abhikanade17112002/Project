const router = require("express").Router();
// const {
//   handleUpdateApplicationStatus,
//   handleApplyToJob,
//   handleGetAppliedJobsByUser,
//   handleGetAllAppliedApplicants
// } = require("../controllers/application.contoller");


const {
reccomandationController ,
analyserController
} = require("../controllers/features.controller");
const Authenticated = require("../middlewares/authentication.middleware");



// router.get("/get",Authenticated,handleGetAppliedJobsByUser);

// // router.get("/",Authenticated,handleGetAllAppliedApplicants);
// router.get("/job/:jobId",Authenticated,handleGetAllAppliedApplicants);
// router.post("/apply/:jobId",Authenticated,handleApplyToJob) ;
// router.post("/status/:applicationId/update",Authenticated,handleUpdateApplicationStatus);


router.post("/test",Authenticated,reccomandationController) ;
router.post("/test2",Authenticated,analyserController) ;


module.exports = router ;