const express = require("express") ;
const  router = express.Router() ;
const {AirplaneController} = require("../../controllers") ;
const {AirplaneMiddlewares} = require("../../middlewares") ;

// console.log("inside airplane routes ")

// /api/get/airplanes  POST request
router.post("/" ,AirplaneMiddlewares.validateCreateRequest , AirplaneController.createAirplane) ;

module.exports = router ;

