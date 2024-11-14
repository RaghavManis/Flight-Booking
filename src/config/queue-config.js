const amqplib = require("amqplib");

let channel, connection; 

async function connectQueue() {  // this function is only for estblising connection between the booking service and notification service through a channel 
    try {
        connection = await amqplib.connect("amqp://localhost");
        channel = await connection.createChannel();
        await channel.assertQueue("noti-queue");
    } catch(error) {
        console.log("error inside catch block of connectQueue in queue-config" + error) ;
        console.log(error);
    }
}

async function sendData(data){
    try {
        await channel.sendToQueue("noti-queue", Buffer.from(JSON.stringify(data)));
    } catch (error) {
        console.log("error inside catch block of send data in queue-config" + error) ;
    }
}

module.exports = {
    connectQueue,
    sendData
}