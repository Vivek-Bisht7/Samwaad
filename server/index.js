const express = require('express');
const app = express();
const {dbConnection} = require('./config/connection');
const tempUserRoutes = require('./routes/tempUserRoutes');
const cors = require('cors');

require('dotenv').config();
dbConnection();

app.use(cors());

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use("/api/otp",tempUserRoutes);

app.listen(process.env.PORT , ()=>{
    console.log("Server has started running..");
    
})