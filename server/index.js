const express = require('express');
const app = express();

require('dotenv').config();

app.get('/' , ()=>{
    console.log("Namaskar");
})

app.listen(process.env.PORT , ()=>{
    console.log("Server has started running..");
    
})