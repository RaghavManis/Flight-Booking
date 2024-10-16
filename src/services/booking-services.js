
const axios = require("axios");
const db = require("../models");
const {ServerConfig} = require("../config") ;
const {AppError} = require("../utills/error") ;
const {StatusCodes} = require("http-status-codes") ;

async function createBooking(data) {
    return new Promise((resolve , reject ) => {
        const result =  db.sequelize.transaction(async function bookingImplementation(t) {
            const flight = await axios.get(`${ServerConfig.FLIGHT_SERVICE}/api/get/flights/${data.flightId}`);
            const flightData = flight.data.data ;
            console.log(flight.data) ;
            // console.log("inside promises in booking services ") ;
            if(data.noOfSeats > flightData.totalSeats){
                console.log("bad request code is ---> " + StatusCodes.BAD_REQUEST) ;
                reject(new AppError("required seats exceeds the available seats" , StatusCodes.BAD_REQUEST)) ;
            }
            resolve(true) ;  
        });
    })
}

module.exports = {
    createBooking,
};
  