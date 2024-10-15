const express = require("express") ;
const router = express.Router() ;
const airplaneRoutes = require("./airplane-routes") ;
const {infoController} = require("../../controllers") ;

// console.log("inside index of v1") ;

router.use("/airplanes" , airplaneRoutes) ;
router.get("/info" ,infoController.info);
module.exports = router ; 