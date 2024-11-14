const { StatusCodes } = require("http-status-codes") ;
const {Op} = require("sequelize") ;
const {Bookings} = require("../models") ;
const crudRepository = require("./crud-repository") ;
const { AppError } = require("../utills/error");
const {Enums} = require("../utills/common") ;
const {CANCELLED , BOOKED , INITIATED , PENDING} = Enums.BOONIKG_STATUS ;
class bookingRepository extends crudRepository {
    constructor(){
        super(Bookings)
    } ;

    async createBooking(data , transaction){
        const response = await Bookings.create(data , {transaction : transaction})
        return response ;
    }

    async get(data , transaction){
        let response = await Bookings.findByPk(data , {transaction : transaction}) ;
        // try{ 
        //     response = await Bookings.findByPk(data , {transaction : transaction}) ;
        //     console.log("inside get function in booking repo") ;
        // }catch(e){
        //     console.log(e);
        //     throw new AppError(e.message , StatusCodes.INTERNAL_SERVER_ERROR) ;    
        // }
        
        if(!response){
            throw new AppError("not able to find the user with provided userId" , StatusCodes.NOT_FOUND) ;
        }   
        return response ;
    }
    
    async update(id ,data , transaction){
        const response = await this.model.update(data , {
            where :{
                id : id ,
            }
        } , { transaction:transaction })
        return response ;
    }

    async cancelOldBookings(timeStamp){ // why not you call here the transaction 
        const response = await Bookings.update({status : CANCELLED} , {
            where : {
                [Op.and] : [
                    {
                        createdAt : {
                            [Op.lt] : timeStamp ,
                        }
                    } ,
                    {
                        status : {
                            [Op.ne] : CANCELLED ,
                        }
                    },
                    {
                        status : {
                            [Op.ne] : BOOKED ,
                        }
                    }
                ]
            }
        })
        return response ;
    }
}

module.exports = bookingRepository ; 