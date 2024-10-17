const {ErrorResponse , SuccessResponse} = require("../utills/common/") ;
const {BookingService} = require("../services") ;
const {StatusCodes} = require("http-status-codes") ;
const { log } = require("winston");

async function createBooking(req , res){
    try {
        const booking = await BookingService.createBooking({
            flightId : req.body.flightId ,
            noOfSeats : req.body.noOfSeats ,
            userId : req.body.userId ,
        })
        SuccessResponse.data = booking ;
        return res.status(StatusCodes.CREATED)
                  .json(SuccessResponse)
    } catch (error) {
        console.log("------>"+ error.statusCode)
        console.log("error in booking controller is ---> " + error.statusCode) ;
        ErrorResponse.error = error ;
        return res
                .status(error.statusCode) 
                .json(ErrorResponse) ;
    }
}

async function makePayments(req ,res){
    try {
        console.log("inside the booking controller(make payments)") ;
        console.log("userId -> " , req.body.userId  , " , booking id--> " ,req.body.bookingId , " , total cost --> " , req.body.totalCost) ;
        const payment = await BookingService.makePayments({
            userId : req.body.userId ,
            bookingId : req.body.bookingId ,
            totalCost : req.body.totalCost ,
        })
        SuccessResponse.data = payment ;
        return res.status(StatusCodes.OK)
                  .json(SuccessResponse)
    } catch (error) {
        console.log("------>"+ error)
        console.log("error in booking controller is ---> " + error.statusCode) ;
        ErrorResponse.error = error ;
        return res
                .status(error.statusCode)        
                .json(ErrorResponse) ;
    }
}

module.exports = {
    createBooking ,
    makePayments ,
}
