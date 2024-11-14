const express = require("express") ;
const  router = express.Router() ;
const { BookingController } = require("../../controllers") ;
const { BookingMiddleware } = require("../../middlewares") ;

// console.log("inside airplane routes ")

// /api/get/bookings  POST request
router.post("/" ,BookingMiddleware.validateCreateBooking , BookingController.createBooking) ;

router.post("/payments" , BookingController.makePayments) ;

module.exports = router ;

