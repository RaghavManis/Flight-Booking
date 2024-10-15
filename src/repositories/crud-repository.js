const { StatusCodes } = require("http-status-codes");
const AppError = require("../utills/error/app-error");


class crudRepository{
    constructor(model){
        this.model = model ;
    }

    async create(data){ // data will be in object form 
            // console.log("inside crud repo(create function)") ;
            // console.log(data) ;
            const response = await this.model.create(data) ;
            // console.log("respone in crud repo ------ "+response) ;
            return response ;
        }
        
    async destroy(data) {
        const response = await this.model.destroy({
            where: {
                id: data
            }
        });
        // console.log("response in crud repo outside the if condition  --> ",response);
        if(response == 0){
            // console.log("response in crud repo inside condition of not present --> ",response);
            throw new AppError("airplane you requested for deleting is not on the database" , StatusCodes.NOT_FOUND) ;  
        }
        return response;
    }
    
    async get(id){ 
        const response = await this.model.findByPk(id) ;
        if(!response){
            throw new AppError("data you are looking for is not in the database" , StatusCodes.NOT_FOUND) ;
        }
        return response ;
    } 
    
    async getAll(){ // data will be in object form 
        const response = await this.model.findAll() ;
        // console.log("inside getAll of crud repo -----" ) ;
        // console.log("typeof response in getAll in crud repo ---" + typeof response) ;
        // console.log("response in getAll in crud repo -------"+ response) ;
        return response ;
    }
    async update(data , id) { 
        const [updatedRows] = await this.model.update(data, {
            where: {   
                id: id ,
            }
        });
        // console.log("type of updated rows : " + typeof updatedRows + ",,, value = " + updatedRows) ;
        if (updatedRows === 0) {
            // If no rows were updated, throw a NOT FOUND error
            console.log("handling the error") ;
            throw new AppError("The data  you want to update is not present in the database", StatusCodes.NOT_FOUND);
        }
       
        // Fetch the updated airplane and return it
        const updatedData = await this.model.findByPk(id);
        // console.log(typeof updatedData); 
        return updatedData;
    }
}

module.exports = crudRepository ;