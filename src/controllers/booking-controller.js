const {ErrorResponse , SuccessResponse} = require("../utills/common/") ;
const {BookingService} = require("../services") ;
const {StatusCodes} = require("http-status-codes") ;

async function createBooking(req , res){
    try {
        const booking = await BookingService.createBooking({
            flightId : req.body.flightId ,
            noOfSeats : req.body.noOfSeats ,
        })
        console.log("inside try block of booking controller") ;
        SuccessResponse.data = booking ;
        return res.status(StatusCodes.CREATED)
                  .json(SuccessResponse)
    } catch (error) {
        // console.log("inside booking controller , succesResponse-->" + SuccessResponse , "   , errorResponse --> " + ErrorResponse) ;
        // console.log("error in booking controller is ---> " + error.statusCode) ;
        ErrorResponse.error = error ;
        return res
                .status(error.statusCode)       // why can't we use error.status when using promises in booking services 
                // .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse) ;
    }
}

module.exports = {
    createBooking ,
}