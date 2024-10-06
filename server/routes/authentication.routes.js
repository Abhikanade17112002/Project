const { handleUserSignUp, handleUserSignIn, handleUserSignOut, handleUserProfileUpdate } = require("../controllers/authetication.controller");
const Authenticated = require("../middlewares/authentication.middleware");
const router = require("express").Router() ;
const multer = require("multer") ;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/userprofile');
    },
    filename: function (req, file, cb) {
        cb(null, `profileimage-${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

// Sign In 
router.post("/signin",handleUserSignIn) ;
// Sign Up
router.post("/signup",upload.single("file"),handleUserSignUp) ;
// Sign Out
router.get("/signout",handleUserSignOut) ;
// Profile Update
router.post("/profile/update",Authenticated,handleUserProfileUpdate) ;











module.exports = router ;