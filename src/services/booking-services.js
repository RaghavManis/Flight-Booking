
const axios = require("axios");
const db = require("../models");
const {ServerConfig} = require("../config") ;
const {AppError} = require("../utills/error") ;
const {StatusCodes} = require("http-status-codes") ;
const {BookingRepository} = require("../repositories") ;
const serverConfig = require("../config/server-config");
const {Enums} = require("../utills/common/") ;
const {INITIATED , CANCELLED , BOOKED , PENDING} =Enums.BOONIKG_STATUS ;

const bookingRepository = new BookingRepository() ;

async function createBooking(data){
    const transaction = await db.sequelize.transaction() ; // initialising the transaction 
    try {
        const flight = await axios.get(`${ServerConfig.FLIGHT_SERVICE}/api/get/flights/${data.flightId}`); // calling this api from the another server with the help of axios --> localhost:3000/api/get/flights/1 (in place of any id which is passed by user)
        const flightData = flight.data.data ;

        if(data.noOfSeats > flightData.totalSeats){
            throw new AppError('Not enough seats available', StatusCodes.BAD_REQUEST);
        }

        const totalBillingAmount = data.noOfSeats * flightData.price ;
        const bookingPayLoad = {...data , totalCost : totalBillingAmount} ;// ... is used to add all the values of data object inside bookingPayLoad
        const booking = await bookingRepository.create(bookingPayLoad , transaction) ;  // we have to pass the transaction eack time when we go further inside the folder structure 
        // const booking = await bookingRepository.createBooking(bookingPayLoad , transaction) ;
        // i think createBooking should be used
        // (both code are working => we can execute a function which is inside the another function directly by calling that function 
        // (it's my conclusion , what is 100% true i don't know ))

        await axios.patch(`${serverConfig.FLIGHT_SERVICE}/api/get/flights/${data.flightId}/seats` , { // isi line of code ke vjh se seats update ho ja rhh flight me whenever we just query the seats avalability in booking
            seats : data.noOfSeats
        })

        await transaction.commit() ;
        return booking ;  
    } catch (error) {
        console.log("error inside the booking service ---> " + error);
        await transaction.rollback() ;
        throw error ;
    }
}

module.exports = {
    createBooking,
    // makePayments ,
};
   