const mongoose = require('mongoose')

/*Define the userSchema
1. name
2. userID
3. password
4. email
5. userType

*/

const userSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    userID:{
        type : String,
        required :true,
        unique :true
    },
    password:{
        type : String , 
        required :true
    },
    email : {
        type : String , 
        required : true,
        lowercase :true,
        unique : true , 
        minLength : 10
    },
    userType : {
        type : String , 
        default :"CUSTOMER",
        enum : ["CUSTOMER","ADMIN"]
    }
},{timestamps:true , versionkey:false})

//To make user collection based on UserSchema

module.exports = mongoose.model("User",userSchema);

//Collection will be created called as 'Users'