const express = require("express") ;
const {ServerConfig , Logger} = require("./config") ;
const router = require("./routes") ;
// const { cli } = require("winston/lib/winston/config");
const app = express() ;

app.use(express.json()) ;
app.use(express.urlencoded({extended:true})) ;

app.listen(ServerConfig.PORT , ()=>{
    // console.log(process) ;
    console.log(`server is succesfully started at port no ${ServerConfig.PORT}`) ;
    // Logger.info("server succesfully started") ;
})
// console.log("inside main index.js")
app.use("/api" , router) ;



/**
    what is process and what is process.env ?

    In Node.js, process is a global object that provides information and control over the current Node.js process.
    It is an instance of EventEmitter and contains a lot of useful properties and methods to interact with the environment in which the
    Node.js application is running.
    
    
    process.env is an object that contains the user environment, i.e., the environment variables of the system that are available to the
    running Node.js process.
    
    For example, environment variables are used to store configuration information, such as:
    
    Port number
    Database connection strings
    API keys
 */


/**
 * why we make many index.js file throughout our project 
 * 
 * because , let suppose we have to import 10 controller then we have to write 10 import statements which is not the efficient way , 
 * so for each folder we will make index.js file and then we import that index file in our main index and then form there we will use 
 * all different controller
 */



/**
 * can we delete package-lock.json  ?
 * 
 * yes you can but next time when someone again use npm install express then it might be chances that installing packages again have latest version
 * which may not match to the requirements of your project's package version, which can lead to the giving error 
 */



/**
 * why we use router and when to use router.use() , router.methods() , app.use(), app.methods()
 * 
 * router is use like a mini app...we don't have to use express app in different part of the same project 
 * 
 * router.use()--> use for applying on the all routes (below that) in that specifc file
 * router.methods()--> just like app.methods() in router wali file me 
 * app.methods()---> you know it
 * app.use()--> to use the imported router wali file instead of app.methods() .........since in the main index file how can we know that which 
 *              methods have to use for diferent api so just use app use then router will manage remaining thing
 */


/**
 * DIFFERENCE BETWEEN THE SQL DATABASE AND NOSQL DATABASE ?
 * 
 * Key Differences.....
 * STRUCTURE : SQL databases are table-based, while NoSQL databases are more flexible in data storage formats.
 * SCHEMA : SQL has a rigid schema; NoSQL has a flexible schema.
 * SCALABILITY : SQL databases typically scale vertically (adding more power to the server), whereas NoSQL databases often scale horizontally (adding more servers).
 * USE CASES : SQL is best for structured data and complex queries; NoSQL is better for unstructured data and rapid development.
 * 
 * EXAMPLE (NOSQL) -->: MySQL, PostgreSQL, Microsoft SQL Server, SQLite.
 * EXAMPLE (SQL) -->: MongoDB, Redis, Cassandra, CouchDB.
 */

/**
 * WHAT IS ORM AND ODM ..?
 * 
 * ORM (Object-Relational Mapping) and ODM (Object-Document Mapping) are two different techniques for interacting with databases in 
 * object-oriented programming. Both help developers manage data using objects, which can make database interactions easier and more intuitive.

 * 1. ORM (Object-Relational Mapping)
 * Definition: ORM is a technique used to interact with SQL (relational) databases. It maps the rows of a table to objects in code, 
 *             allowing developers to work with database data using familiar programming language constructs instead of writing raw SQL queries.
 * How It Works: With ORM, each table in the database is represented as a class in the code, and each row is an object of that class. 
 *               Columns in the table become the properties of that class.
 * Examples of ORM Libraries: Sequelize (for Node.js), Hibernate (for Java), Entity Framework (for .NET)
 * 
 * 2. ODM (Object-Document Mapping)
 * Definition: ODM is similar to ORM but is used for NoSQL (document) databases, like MongoDB. It maps documents to objects in code, 
 *             allowing developers to interact with the database using their programming language.
 * How It Works: With ODM, each document in a collection is represented as an object in the code. Properties of the document are mapped to 
 *               fields in that object.
 * Examples of ODM Libraries: Mongoose (for MongoDB in Node.js), 
 * Benefits:
 * Allows developers to interact with MongoDB documents using object-oriented syntax.
 * Provides features like schema validation, middleware, and hooks.
 * Simplifies CRUD operations (Create, Read, Update, Delete).
 * 
 * 
 * WE NEED A DRIVER FOR CONNECTING ORM/ODM TO OUR DATABASES----> since by installing ORM/ODM will just help to connect our database to our project
 *                                                               but driver will help to understand the exact queries 
 */

/**
 * IN CONFIG.JSON IN CONFIG FOLDER WHAT DOES DIELECT DO ?
 * 
 * it indicates that through which database our application is connected. The dialect is important because it tells the ORM (like Sequelize) how
 * to communicate with the database, as different databases may have varying query languages and features. 
 */

/**
 * models file are at js level 
 * migration files are at database level 
 */

/**
 * IS THERE ANY DIFFERENCE BETWEEN RETURN AND THROW , WHNE WE USE WHICH ONE OF THIS
 * 
 * Use return when:

 * You want to return a value from a function under normal circumstances.
 * The function execution is complete and you need to provide a result or end the function.
 * 
 * Use throw when:
 * 
 * You encounter an error or an exceptional situation, and you need to notify the caller that something went wrong.
 * You want the error to be caught by error-handling code (e.g., try...catch).
 */

/**
 * WHY WE NEDD THIS TWO LINES OF CODE --->app.use(express.json()) ; app.use(express.urlencoded({extended:true})) ;

 * 
 * are needed so your Express app can read and understand the data that comes from the client.

 * app.use(express.json()):
 * 
 * This helps the server READ JSON DATA from the client's request.
 * Example: If you send { "name": "John" } in a request, this line allows you to access it using req.body.name.
 *  
 * 
 * app.use(express.urlencoded({ extended: true })):
 * 
 * This helps the server READ FORM DATA from the client, like when a user submits a form on a website.
 * Example: If you send name=John&age=30, this line allows you to access it using req.body.name and req.body.age.
 */