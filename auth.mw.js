const user_model=require("../models/user.models")
const jwt=require("jsonwebtoken")
const auth_config=require("../config/auth.config")
const verifySignUpBody = async (req,res,next)=>{

    try{
        //check  for name

        if(!req.body.name){
            return res.status(400).send({
                msg:"Failed! Name was not provided in request body"
            })
        }


        //check  for email
        if(!req.body.email){
            return res.status(400).send({
                msg:"Failed! Email was not provided in request body"
            })
        }


        //check  for userID
        if(!req.body.userID){
            return res.status(400).send({
                msg:"Failed! userID was not provided in request body"
            })
        }


        //check  if the user with same 
        const user = await user_model.findOne({userID:req.body.userID})

        if(user)
        {
            return res.status(400).send({
                msg:"Failed! user with same ID is already present"
            })
        }

        next()

    }
    catch(err)
    {
        console.log("Error while validating the request object",err)
        res.status(500).send({
            message :"Error while validating the request body "
        })
    }
}

const verifySigninBody =async(req,res,next)=>{

    if(!req.body.userID){
        return res.status(400).send({
            message : "user id is not provided"
        })
    }

    if(!req.body.password){
        return res.status(400).send({
            message : "password is not provided"
        })
    }
    next()
}

const verifyToken=(req,res,next)=>{
    // check token is present in the header
     const token = req.headers['x-access-token']
     if(!token){
        return res.status(403).send({
            message:"No token found : unAuthorized"
        })
     }
    // if it is the valid token
    jwt.verify(token,auth_config.secret,async (err,decode)=>{
        if(err){
            return res.status(401).send({
                message:"unAuthorized"
            })
        }
        const user=await user_model.findOne({userID:decode.id})
        if(!user){
            return res.status(400).send({
                message:"unAuthorized, this user for this doesn't exits"
            })
        }
        req.user=user
        next()
    })
   
    // then move to the next step
}

const admin=(req,res,next)=>{
    const user=req.user
    if(user && userType=="ADMIN"){
        next()
    }
    else{
        return res.status(401).send({
            message:"only admin user is allowed to access this end point"
        })
    }
}
module.exports = {
    verifySignUpBody : verifySignUpBody,
    verifySigninBody : verifySigninBody,
    verifyToken:verifyToken,
    admin:admin

}
