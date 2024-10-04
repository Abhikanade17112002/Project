const { handleUserSignUp, handleUserSignIn, handleUserSignOut, handleUserProfileUpdate } = require("../controllers/authetication.controller");
const Authenticated = require("../middlewares/authentication.middleware");

const router = require("express").Router() ;

// Sign In 
router.post("/signin",handleUserSignIn) ;
// Sign Up
router.post("/signup",handleUserSignUp) ;
// Sign Out
router.get("/signout",handleUserSignOut) ;
// Profile Update
router.post("/profile/update",Authenticated,handleUserProfileUpdate) ;











module.exports = router ;