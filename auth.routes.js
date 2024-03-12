/*
POST localhost:8080/ecomm/api/v1/auth/signup

I need to intercept this request
*/
//If app gets a post call hand it over to controller
const auth_middleware=require("../middlewares/auth.mw")
const auth_controller=require("../controllers/auth.controllers")
module.exports=(app)=>{
   app.post("/ecomm/api/v1/auth/signup",[auth_middleware.verifySignUpBody],auth_controller.signup)

   // route foor 
   // POST localhost:8000/ecomm/api/v1/auth/signin
   app.post("/ecomm/api/v1/auth/signin",[auth_middleware.verifySigninBody],auth_controller.signin)

}
