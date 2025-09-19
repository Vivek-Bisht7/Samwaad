const jwt = require('jsonwebtoken');

const authenticateUser = (req,res,next)=>{

    try{
        const cookie = req.cookies.accessToken;

        if(!cookie) return res.status(401).json({status:false,message:"Unauthorized"});

        jwt.verify(cookie,process.env.ACCESS_SECRET,(err,decoded)=>{
            if(err) return res.status(403).json({message:"Invalid or expired token"});
          
            req.user = decoded;
            
            next();
    })
    }
    catch(err){
        console.error("Error : " + err.message);
        return res.status(500).json({message:err.message});
    }
}

module.exports = {authenticateUser};