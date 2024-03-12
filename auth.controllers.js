/**
 * I need to write the controllers / logic to register user
 * 
 */
const bcrypt=require("bcryptjs")
const user_model=require("../models/user.models")
const jwt=require("jsonwebtoken")
const secret=require("../config/auth.config")
exports.signup=  async (req,res)=>{
/**
 * logic to create the user
*/

// 1. read the request body
const request_body=req.body
 //Return the JS object
 console.log(request_body)


// 2. insert the data in the User collection in mongodb
const userObj={
    name:request_body.name,
    userID:request_body.userID,
    email : request_body.email,
    userType : request_body.userType,
    password:bcrypt.hashSync(request_body.password,8)
}
try{
    const user_created=await user_model.create(userObj)
    // return the user
    const res_obj = {
        name : user_created.name,
        userID : user_created.userID,
        email  : user_created.email,
        userType : user_created.userType,
        createdAt : user_created.createdAt,
        updatedAt :user_created.updatedAt
      }
    res.status(201).send(res_obj)
}catch(error){
    console.log("Error while registering the user",error);
    res.status(500).send({
        message:"some error happennd while register user"
    })
}
// 3. return the response back too the user

}


exports.signin = async(req,res)=>{

    //Check if the userID is present in the system
   const user = await  user_model.findOne(
        {
            userID:req.body.userID
        }
    )
if(user == null){
   return res.status(400).send({
        msg:"UserId passed is not valid"
    })
}

    //check if password is correct
const isPasswordValid = bcrypt.compareSync(req.body.password,user.password) 
//it return a boolean value - true or false

if(!isPasswordValid){
   return res.status(401).send({msg:"Password is incorrect"})
}

//using jwt we will create a access token with a given TTL and return

const token =jwt.sign({id: user.userID },secret.secret,{
    expiresIn : 120
        })
    
    
        res.status(200).send({
            name:user.name,
            userID : user.userID,
            email: user.email,
            userType : user.userType,
            acesstoken : token
    
        })
    }

