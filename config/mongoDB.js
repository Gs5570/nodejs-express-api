/**
 * configuration that establishes the connection to the DB
 * before creating this file so npm i mongoose
 * after setting up the connecion configure install dotenv with npm to creat a environment variable file that will the credentials for the databse connection
 */

//import mongoose
const mongoose = require('mongoose');

// function establing connection to mongoDB. return success o
module.exports = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI) // makes the request to mongoDB
        mongoose.connection  // checks if we have a connection. if the connection is true // use make mangoose to make the connection
        console.log('MongoDB Connected!');
    }
    catch (error){
        console.log(error);
    }
}