const express = require("express") ;
const  router = express.Router() ;
const {BookingController} = require("../../controllers") ;
const {BookingMiddleware} = require("../../middlewares") ;

// console.log("inside airplane routes ")

// /api/get/airplanes  POST request
router.post("/" ,BookingMiddleware.validateCreateBooking , BookingController.createBooking) ;

module.exports = router ;

