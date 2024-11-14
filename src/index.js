// const amqplib = require("amqplib");
// let connection; // Keep connection outside to close it later

// async function connectQueue() {
//     try {
//         connection = await amqplib.connect("amqp://localhost");  // This line connects to the RabbitMQ server running on localhost (the default location if you’re running RabbitMQ locally).
//                                                                  // amqplib library is used to handle the connection between rabbitmq and node project
//         const channel = await connection.createChannel(); // Channels are the paths through which messages are sent and received in RabbitMQ. Each channel is a virtual connection inside a TCP connection.
//                                                           // Channels allow you to send and receive messages.
        
//         await channel.assertQueue("noti-queue"); 
//         channel.sendToQueue("noti-queue" , Buffer.from(('okay, once more time'))) ;
        
//         // setInterval(() => {
//         //     channel.sendToQueue("noti-queue" , Buffer.from(('something to do '))) ;
//         // } , 1000) ;

//         // const queue = 'notification-queue';
//         // const message = 'Hello, World!';   

//         // await channel.assertQueue(queue, { durable: true });   // assertQueue checks if a queue with the given name (task_queue in this case) exists; if not, it creates one.
//         //                                                        // durable: true ensures that the queue will survive RabbitMQ server restarts, which adds a layer of persistence.
//         // channel.sendToQueue(queue, Buffer.from(message));   // sendToQueue is used to send a message to the specified queue.
//                                                             // The message, which is a string ("Hello, World!"), is converted to a buffer (binary data) using Buffer.from() before sending, as RabbitMQ expects messages in binary format.
 
//         // setTimeout(() => {              // This ensures that the connection is closed after a short delay, allowing the message to be sent fully before the process exits.
//         //     connection.close();
//         //     process.exit(0);      
//         // }, 500); 

//     } catch (error) {  
//         console.log("Error inside connect queue in main index.js --> " + error);
//     }
// }
////////////////////////////////////////    ABOVE CODE IS FOR TESTING NOTIFICATION SERVICE    ///////////////////////////////////////////////////////////////////////////
const express = require("express");

const { ServerConfig, Queue } = require("./config");
const router = require("./routes");
const CRON = require("./utills/common/cron-jobs"); // importing the function which will be responsible for the updating our server every 30 minutes for rejecting the booking which are not completed and of before 5 minute
const app = express();
// const sequelize = require("./config/database") ;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(ServerConfig.PORT, async () => {
    console.log(`Server is successfully started at port no ${ServerConfig.PORT}`);
    CRON();  // for updating the server....see above explanation 
    // await connectQueue(); // line of testing phase
    await Queue.connectQueue() ;
    console.log("Queue connected"); 
    // // await sequelize.sync();
});

app.use("/api", router);


 // BY USING THIS CODE TRYING TO CLOSE THE PREVIOUS INSTANCE OF SERVER AT SAME PORT BUT NOT SUCCECCED
// async function shutdown() {
//     if (server) {
//         server.close(() => {
//             console.log('Server process terminated');
//         });
//     }
//     if (connection) {
//         await connection.close();
//         console.log('RabbitMQ connection closed');
//     }
// }

// process.on('SIGTERM', shutdown);
// process.on('SIGINT', shutdown); // Handle Ctrl+C gracefully      











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