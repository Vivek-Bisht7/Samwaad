const mongoose = require('mongoose');

const dbConnection = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected successfully.");
    }
    catch(e){
        console.log("Error : " + err.message);
        process.exit(1);
    }
}

module.exports = {dbConnection};