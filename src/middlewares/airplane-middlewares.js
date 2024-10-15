const {StatusCodes} = require("http-status-codes") ;
const {ErrorResponse} = require("../utills/common") ;
const AppError = require("../utills/error/app-error");
function validateCreateRequest(req , res , next){
    if(!req.body.modelNumber){
        ErrorResponse.message = "something wrong in the request body" ;
        ErrorResponse.error = new AppError("you don't have given correct modelNumber" , StatusCodes.BAD_REQUEST) ;
        return res
                 .status(StatusCodes.BAD_REQUEST)
                 .json(ErrorResponse) ;
    }
    next() ;
}


module.exports = {
    validateCreateRequest ,
}