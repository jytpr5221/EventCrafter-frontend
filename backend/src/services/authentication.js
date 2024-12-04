const JWT = require('jsonwebtoken')
const secret='$uperMan@6969'

function createTokenForUser(user){
    
    const payload = {
        fullName:user.name,
        id:user._id,
        
        email:user.email,
        contact:user.contact,
        type:user.type

    }
    if(user.address)payload.address=user.address
    if(user.created)payload.created=user.created
    if(user.registerdIn)payload.registerdIn=user.registerdIn
    const token=JWT.sign(payload,secret)
    
    return token
}


function validateToken(token){
    
    
    try{
        const payload=JWT.verify(token,secret)
        return {...payload,password:null,salt:null}
        
        
    }catch(error){

       return null;

    }
  
    
}

module.exports={

    createTokenForUser,
    validateToken
}