// controller for creating the category
// POST localhost:8000/ecomm/api/v1/categories
/** {
//     name:"houseHold",
//     description:"this will have all the household item"
 }*/
const category_model=require("../models/category.model")

 exports.createNewCategory= async (req,res)=>{
    //   Read the req body
    const req_body=req.body
    console.log(req_body)
    // create the category object
    
const cat_data={
    name:req_body.name,
    description:req_body.description
}
    // Insert into mongoDB
    try{
        const category=await category_model.create(cat_data)
        return res.status(201).send(category)
    }catch(err){
        console.log("error while creating category",err)
         return res.status(500).send({
            message:"error while creating category"
        })
    }
    // return the response of the created category
 }