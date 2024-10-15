const dotenv = require("dotenv") ; // This line imports the dotenv package. The dotenv package is used to load environment variables from 
                                   // a .env file into the process.env object, making them available in your application.

dotenv.config() ;   // This line tells dotenv to load the contents of the .env file to the process.env object.
                    // The .env file usually contains key-value pairs representing environment variables By calling dotenv.config(), 
                    // these values are made available to the process.env object, so you can access them using process.env.VARIABLE_NAME.

module.exports = {
    PORT : process.env.PORT ,
}
