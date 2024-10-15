const express = require("express") ;
const v1Routes = require("./v1") ;
const router = express.Router() ;
// console.log("inside routes main index ") ;
router.use("/get" , v1Routes ) ;

module.exports = router ;