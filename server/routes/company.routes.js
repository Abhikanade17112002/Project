const {
  handleRegisterCompany,
  handleGetAllUserCreatedCompany,
  handleGetCompanyById,
  handleUpdateCompanyDetails,
} = require("../controllers/company.controllers");
const Authenticated = require("../middlewares/authentication.middleware");



const router = require("express").Router() ;




router.post("/register", Authenticated ,handleRegisterCompany);
router.get("/", Authenticated ,handleGetAllUserCreatedCompany);
router.put("/update/:companyId", Authenticated ,handleUpdateCompanyDetails);
router.get("/:companyId", Authenticated ,handleGetCompanyById);


module.exports = router ;