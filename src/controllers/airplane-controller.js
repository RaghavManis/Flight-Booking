const {AirplaneService} = require("../services") ;
const {StatusCodes} = require("http-status-codes") ;
const {SuccessResponse , ErrorResponse} = require("../utills/common") ;

async function createAirplane(req , res){
    try {
        const airplane = await AirplaneService.createAirplane({
            modelNumber:req.body.modelNumber ,
            capacity:req.body.capacity ,
        })
        SuccessResponse.data = airplane ;
        return res.status(StatusCodes.CREATED)
                  .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error ;
        return res
                .status(error.statusCode)
                .json(ErrorResponse) ;
    }
    // catch (error) {
    //     ErrorResponse.error = error;
    //     const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR; // Default to 500 if statusCode is undefined
    //     return res.status(statusCode).json(ErrorResponse);
    // }
}

module.exports = {
    createAirplane,
}