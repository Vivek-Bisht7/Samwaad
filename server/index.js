const express = require('express');
const app = express();
const {dbConnection} = require('./config/connection');
const tempUserRoutes = require('./routes/tempUserRoutes');
const userRoutes = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');
const cors = require('cors');

require('dotenv').config();
dbConnection();

app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true                
}));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use("/api/otp",tempUserRoutes);
app.use("/api/user",userRoutes);

app.listen(process.env.PORT , ()=>{
    console.log("Server has started running..");
})