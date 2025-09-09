const express = require('express');
const app = express();
const {dbConnection} = require('./config/connection');
const tempUserRoutes = require('./routes/tempUserRoutes');

require('dotenv').config();
dbConnection();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use("/api/generateOTP",tempUserRoutes);

app.listen(process.env.PORT , ()=>{
    console.log("Server has started running..");
    
})