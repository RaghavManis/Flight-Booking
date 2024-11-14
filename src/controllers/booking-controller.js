const {ErrorResponse , SuccessResponse} = require("../utills/common/") ;
const {BookingService} = require("../services") ;
const {StatusCodes} = require("http-status-codes") ;
const inMemDb = {};  // empty object (once created when server is started and live untill server is crashed or closed )
                     // that's why in below idempotency code (in make payments ) we check idempotency key , is it pre present or not 

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

        // let's make some interesting thing by adding idempotencyKey for avoiding the double payment 
        const idempotencyKey = req.headers['x-idempotency-key'];  // nothing fancy , header is just like body and params  provided by postman 
                                                                  // and x-idempotency-key is variable which we are passing in header which
                                                                  // should be unique for all request 
        if(!idempotencyKey ) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({message: 'idempotency key missing'});
        }
        if(inMemDb[idempotencyKey]) {     // nothing fancy inMemDb is above declared empty object (which stores key values pair )
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({message: 'Cannot retry on a successful payment'});
        } 


        const payment = await BookingService.makePayments({
            userId : req.body.userId ,
            bookingId : req.body.bookingId ,
            totalCost : req.body.totalCost ,
        })

        inMemDb[idempotencyKey] = idempotencyKey;
        
        console.log("inside makePayments in booking controller --> response(payment) = " + payment) ;
        SuccessResponse.data = payment ;
        return res.status(StatusCodes.OK)
                  .json(SuccessResponse)
    } catch (error) {
        console.log("error in makePayments in booking controller is ---> " + error) ;
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
