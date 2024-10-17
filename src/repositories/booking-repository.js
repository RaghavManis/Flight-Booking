const { StatusCodes } = require("http-status-codes") ;
const {Bookings} = require("../models") ;
const crudRepository = require("./crud-repository") ;
const { AppError } = require("../utills/error");
// const bookings = require("../models/bookings");

class bookingRepository extends crudRepository {
    constructor(){
        super(Bookings)
    } ;

    async createBooking(data , transaction){
        const response = await Bookings.create(data , {transaction : transaction})
        return response ;
    }

}

module.exports = bookingRepository ; 