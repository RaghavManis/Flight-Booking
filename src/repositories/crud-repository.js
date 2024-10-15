const {Logger} = require("../config") ;


class crudrepository{
    constructor(model){
        this.model = model ;
    }

    async create(data){ // data will be in object form 
        // try {
            console.log("inside crud repo in crete function " , data) ;
            const response = await this.model.create(data) ;
            // console.log("object") ;
            return response ;
        // } catch (error) {
        //     Logger.info("something went wrong in the crud repository : create") ;
        //     throw error ;
        // }
    }

    async destroy(data){ // data will be in object form 
        try {
            const response = await this.model.destroy({
                where:{
                    id:data ,
                }
            }) ;
            return response ;
        } catch (error) {
            Logger.info("something went wrong in the crud repository : destroy") ;
            throw error ;
        }
    }

    async get(id){ // data will be in object form 
        try {
            const response = await this.model.findByPk(id) ;
            return response ;
        } catch (error) {
            Logger.info("something went wrong in the crud repository : get") ;
            throw error ;
        }
    } 
    
    async getAll(){ // data will be in object form 
        try {
            const response = await this.model.findAll() ;
            return response ;
        } catch (error) {
            Logger.info("something went wrong in the crud repository : getAll") ;
            throw error ;
        }
    }
    
    async update(data , id){
        try {
            const response = await this.model.update(data , {
                where:{
                    id:id ,
                }
            })
            return response ;
        } catch (error) {
            Logger.info("something went wrong in the crud repository : update "); 
            throw error ;
        }
    }
}

module.exports = crudrepository ;