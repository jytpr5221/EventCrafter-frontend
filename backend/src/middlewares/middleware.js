const { validateToken } = require("../services/authentication")

const restrictToLoggedInUsers=(req,res,next)=>{
    // console.log(req)
    if(!req.headers["authorization"]) 
        {  
            return res.status(400).json({error:'user not authenticated'})
        }
    const bearer=req.headers["authorization"]
    const token=bearer.split('Bearer ')[1]
    try {
        const payload=validateToken(token)
        req.user=payload
        next()
    } catch (error) {
        req.user=null
        next()
    }
}

module.exports={restrictToLoggedInUsers}