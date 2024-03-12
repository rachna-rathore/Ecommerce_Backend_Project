/**
 starting point of the project 
 */
const express=require("express")
const mongoose=require("mongoose")
const config_server=require("./config/server.config");
const app=express()

const db_config = require("./config/db.config")
const user_model=require("./models/user.models")
const bcrypt=require("bcryptjs")

app.use(express.json()) //middleware


/**create an admin user at the start of the application
 * if not already present
 
/*Connection with MOngoDB*/

mongoose.connect(db_config.DB_URL)

const db = mongoose.connection

db.on("error",()=>{
   console.log("Error on connection with MongoDB")
})

db.once("open",()=>{
    console.log("Connected with MongoDB")
    init()
   
})
async function init()
{
    try{
        let user =  await user_model.findOne({userID : "admin"})
        if(user)
        {
            console.log("Admin is already present")
            return 
        }
    }
    catch(err){
console.log("Error while reading data ", err)
    }
   
   
    try{
        user = await user_model.create({
            name:"Rachna",
            userID:"admin",
            email:"kumarirachna@gmail.com",
            userType:"ADMIN",
            password:bcrypt.hashSync("Welcome1",8)
        })
        console.log("Admin created ",user)
    }

    catch(e){
        console.log("Error while creating admin "+ e)
    }

}

//Stitch the routes to server

//calling routes and passing app object
require("./Routes/auth.routes")(app)
require("./Routes/category.routes")(app)

// start server from here

app.listen(config_server.PORT ,()=>{
    console.log("server is started at port",config_server.PORT);
})