const {} = require("http-status-codes") ;
const {Bookings} = require("../models") ;
const crudRepository = require("./crud-repository") ;
const bookings = require("../models/bookings");

class bookingRepository extends crudRepository {
    constructor(){
        super(Bookings)
    } ;

}

module.exports = bookingRepository ;