//import express
const express = require('express');
const mongoDB = require('./config/mongoDB');
const app = express();

//import authRouter to secure route
const authRouter = require('./routes/authRouter');
//import student route
const studentsRouter = require('./routes/studentsRouter');
// import faculty
const facultyRouter = require('./routes/facultyRouter');

//import morgan(middleware logger that logs requests to the console )
const morgan = require('morgan');

//import helmet (add alayer of security in the headers)
const helmet = require('helmet');
// import env & init dotrenv
require("dotenv").config();


//midleware
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());


PORT = process.env.PORT || 3000;



//import mongoDBconfig to connect to DB
const mongoDBConfig = require('./config/mongoDB')

/** Routes */
app.use('/students', studentsRouter)
app.use('/login', authRouter)
app.use('/faculty', facultyRouter)
//root 
app.get('/',(req, res) =>{
    res.send('welcome to the school system')
})

app.listen(PORT, ()=>{
    console.log(`server is listening on port ${PORT}`);
    mongoDB();
})