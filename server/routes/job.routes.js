const Authenticated = require("../middlewares/authentication.middleware") ;
const  { handleGetAllJobPosting,handleGetAllJobsByUser, handleGetJobById , handlePostJob } = require("../controllers/job.controllers") ;
const express = require("express") ;

const router = express.Router();

router.route("/post").post(Authenticated, handlePostJob);
router.route("/").get(Authenticated, handleGetAllJobPosting);
router.route("/admin").get(Authenticated, handleGetAllJobsByUser);
router.route("/get/:jobId").get(Authenticated, handleGetJobById);

module.exports = router ;

