const mongoose = require('mongoose');

const dbConnection = async ()=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/Samwaad");
        console.log("Database connected successfully.");
    }
    catch(e){
        console.log("Error : " + err.message);
        process.exit(1);
    }
}

module.exports = {dbConnection};