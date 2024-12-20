const axios = require("axios");
const db = require("../models");
const {ServerConfig , Queue} = require("../config") ;
const {AppError} = require("../utills/error") ;
const {StatusCodes} = require("http-status-codes") ;
const {BookingRepository} = require("../repositories") ;
const serverConfig = require("../config/server-config");
const {Enums} = require("../utills/common/") ;
// const { log } = require("winston");
const {INITIATED , CANCELLED , BOOKED , PENDING} =Enums.BOONIKG_STATUS ;

const bookingRepository = new BookingRepository() ;

async function createBooking(data){
    const transaction = await db.sequelize.transaction() ; // initialising the transaction 
    try {
        const flight = await axios.get(`${ServerConfig.FLIGHT_SERVICE}/api/get/flights/${data.flightId}`); // calling this api from the another server with the help of axios --> localhost:3000/api/get/flights/1 (in place of any id which is passed by user)
        console.log("inside service try block") ;
        const flightData = flight.data.data ;

        if(data.noOfSeats > flightData.totalSeats){
            throw new AppError('Not enough seats available', StatusCodes.BAD_REQUEST);
        }

        const totalBillingAmount = data.noOfSeats * flightData.price ;
        const bookingPayLoad = {...data , totalCost : totalBillingAmount} ;// ... is used to add all the values of data object inside bookingPayLoad
        const booking = await bookingRepository.create(bookingPayLoad , transaction) ;  // we have to pass the transaction each time when we go further inside the folder structure 
        // const booking = await bookingRepository.createBooking(bookingPayLoad , transaction) ;
        // i think createBooking should be used
        // (both code are working => we can execute a function which is inside the another function directly by calling that function 
        // (it's my conclusion , what is 100% true i don't know ))
        console.log("inside try block in createBooking of booking service ") ;    
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

async function makePayments(data){
    const transaction = await db.sequelize.transaction() ; // again making this api a transaction so that no effects will occur if any error occur in between the execution of this api

    try {
        console.log("bookingId inside try in booking service --> " + data.bookingId) ;
        const bookingDetails = await bookingRepository.get(data.bookingId ,  transaction) ; // remeber the way of applying the transaction at crud level , same syntax for transaction will be use in booking repo or crud repo if needed 
        
        console.log("inside try block of make payments in booking service ") ;
        // A BUNCH OF CROSS CHECKING OF USER TO VERIFY THE DETAILS BEFORE PAYMENT 

        if(bookingDetails.userId != data.userId){
            throw new AppError("The user corresponding to the booking doesnt match" , StatusCodes.BAD_REQUEST) ;
        }
        
        if(bookingDetails.status == CANCELLED){
            throw new AppError("Your booking is expired" , StatusCodes.BAD_REQUEST ) ;
        }

        const bookingTime = new Date(bookingDetails.createdAt) ;
        const currentTime = new Date() ;
        if(currentTime-bookingTime > 300000){
            await cancelBooking(data.bookingId) ;

            // code before implementation of the cancel booking(untill here we are only able to update the booking status in booking model but
            // we are not increasing the no of seats in flight model )
            // await bookingRepository.update(data.bookingId , {status : CANCELLED} , transaction) ; 
            throw new AppError("aahahaa ! Your booking is expired" , StatusCodes.BAD_REQUEST) ;
        }

        if(bookingDetails.totalCost != data.totalCost){
            throw new AppError("Dont't try to be smart ....please enter the right amount " , StatusCodes.BAD_REQUEST) ;
        }

        // if(bookingDetails.userId != data.userId){
        //     throw new AppError("The user corresponding to the booking doesnt match" , StatusCodes.BAD_REQUEST) ;
        // }

        // now we assume that we are ready to make payment
        await bookingRepository.update(data.bookingId , {status : BOOKED} , transaction) ;

        Queue.sendData({
            recepientEmail: 'mnsyd24@gmail.com',
            subject: 'Flight booked',
            text: `Booking successfully done for the booking ${data.bookingId}`
        });

        await transaction.commit() ;
        return bookingDetails ;
        
    } catch (error) {
        console.log(error);
        console.log("error iniside make payment inside booking service is --> " + error ) ;
        await transaction.rollback() ;
        throw error ;
    }
}

async function cancelBooking(bookingId){
    const transaction = await db.sequelize.transaction() ;
    try {
        const bookingDetails = await bookingRepository.get(bookingId , transaction ) ;   

        if(bookingDetails.status == CANCELLED){
            await transaction.commit() ;
            return true ;
        }

        await axios.patch(`${serverConfig.FLIGHT_SERVICE}/api/get/flights/${bookingDetails.flightId}/seats` , {
            seats : bookingDetails.noOfSeats ,
            dec : "false" ,
        })

        await bookingRepository.update(bookingId , {status : CANCELLED} , transaction) ;

        await transaction.commit() ;
    } catch (error) {
        await transaction.rollback() ;
        throw error ; // no need to send AppError ....because this cancelBooking function is call from the makePayments and from where
                      // it is calling we are handling the error
    }
}

async function cancelOldBookings(){
    try {
        const time = new Date(Date.now() - 1000 * 300) ; //date (date object) before 5 minutes (1000 is mili second and 300 is in seconds )
        const response = await bookingRepository.cancelOldBookings(time) ;
        return response ;
    } catch (error) {
        console.log(error) ;// why not you handling the error ;
    }
}

module.exports = {
    createBooking,
    makePayments ,
    cancelOldBookings ,
};
   